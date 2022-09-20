import { useEffect, useState, RefObject } from 'react';

const useHandleScrollBySideBtnClick = (scrollWrapRef: RefObject<HTMLElement>, countOfItems: number) => {
  const [isLeftVisible, setLeftVisible] = useState(false);
  const [isRightVisible, setRightVisible] = useState(false);

  const onLeftClick = () => {
    if (!scrollWrapRef.current) return;

    const { scrollLeft, scrollWidth } = scrollWrapRef.current;

    const AVG_WIDTH = Math.ceil(scrollWidth / countOfItems);

    if (AVG_WIDTH > scrollLeft) setLeftVisible(false);

    setRightVisible(true);

    scrollWrapRef.current.scrollTo({
      left: scrollLeft - AVG_WIDTH,
      behavior: 'smooth',
    });
  };

  const onRightClick = () => {
    if (!scrollWrapRef.current) return;

    const { clientWidth, scrollLeft, scrollWidth } = scrollWrapRef.current;

    const AVG_WIDTH = Math.ceil(scrollWidth / countOfItems);
    const scrollRight = scrollWidth - (scrollLeft + clientWidth);

    if (AVG_WIDTH > scrollRight) {
      setRightVisible(false);
    }

    setLeftVisible(true);

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
  }, []);

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
