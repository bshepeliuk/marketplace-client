import { useEffect, useState, RefObject } from 'react';

const useHandleScrollBySideBtnClick = (
  scrollWrapRef: RefObject<HTMLDivElement>,
  countOfItems: number,
) => {
  const [isLeftVisible, setLeftVisible] = useState(false);
  const [isRightVisible, setRightVisible] = useState(false);

  const onLeftClick = () => {
    if (!scrollWrapRef.current) return;

    const { scrollLeft, scrollWidth } = scrollWrapRef.current;

    const hasStartedScroll = scrollLeft > 0;
    const hasReachedStart = scrollLeft === 0;

    const AVG_WIDTH = Math.ceil(scrollWidth / countOfItems);

    if (hasReachedStart) setLeftVisible(false);
    if (hasStartedScroll) setRightVisible(true);

    scrollWrapRef.current.scrollTo({
      left: scrollLeft - AVG_WIDTH,
      behavior: 'smooth',
    });
  };

  const onRightClick = () => {
    if (!scrollWrapRef.current) return;

    const { clientWidth, scrollLeft, scrollWidth } = scrollWrapRef.current;

    const hasEndReached = scrollLeft + clientWidth === scrollWidth;
    const hasStartedScroll = scrollLeft > 0;

    const AVG_WIDTH = Math.ceil(scrollWidth / countOfItems);

    if (hasStartedScroll) setLeftVisible(true);
    if (hasStartedScroll && hasEndReached) setRightVisible(false);

    scrollWrapRef.current.scrollTo({
      left: scrollLeft + AVG_WIDTH,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!scrollWrapRef.current) return;

    const { clientWidth, scrollLeft, scrollWidth } = scrollWrapRef.current;
    const hasReachedBegin = scrollLeft === 0;

    if (hasReachedBegin) setLeftVisible(false);
    if (scrollWidth > clientWidth) setRightVisible(true);
  }, [scrollWrapRef.current]);

  useEffect(() => {
    if (!scrollWrapRef.current) return;

    const { clientWidth, scrollLeft, scrollWidth } = scrollWrapRef.current;

    const hasEndReached = scrollLeft + clientWidth === scrollWidth;
    const hasStartedScroll = scrollLeft > 0;
    const hasReachedStart = scrollLeft === 0;

    if (hasReachedStart) setLeftVisible(false);

    if (hasStartedScroll) {
      setLeftVisible(true);
      setRightVisible(true);
    }

    if (hasStartedScroll && hasEndReached) {
      setRightVisible(false);
    }
  }, [scrollWrapRef.current?.scrollLeft]);

  useEffect(() => {
    if (!scrollWrapRef.current) return;

    const { clientWidth, scrollLeft, scrollWidth } = scrollWrapRef.current;

    const hasEndReached = scrollLeft + clientWidth === scrollWidth;

    if (clientWidth >= scrollWidth || hasEndReached) setRightVisible(false);
    if (scrollWidth > clientWidth) setRightVisible(true);
  }, [countOfItems]);

  return {
    onLeftClick,
    onRightClick,
    isLeftVisible,
    isRightVisible,
  };
};

export default useHandleScrollBySideBtnClick;
