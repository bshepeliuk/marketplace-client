import { useEffect, useRef, useState, RefObject } from 'react';

const useHandleScrollOnMouseEvents = (
  scrollWrapRef: RefObject<HTMLDivElement | null>,
) => {
  const position = useRef({ x: 0, left: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    scrollWrapRef.current?.addEventListener('mousedown', onDownHandler);

    return () => {
      scrollWrapRef.current?.removeEventListener('mousedown', onDownHandler);
    };
  }, []);

  function onDownHandler(evt: MouseEvent) {
    if (!scrollWrapRef.current) return;

    setIsScrolling(true);

    position.current.x = evt.clientX;
    position.current.left = scrollWrapRef.current.scrollLeft;

    scrollWrapRef.current.addEventListener('mousemove', onMoveHandler);
    document.addEventListener('mouseup', onUpHandler);
  }

  function onUpHandler() {
    if (!scrollWrapRef.current) return;

    setIsScrolling(false);

    scrollWrapRef.current.removeEventListener('mousemove', onMoveHandler);
    document.removeEventListener('mouseup', onUpHandler);
  }

  function onMoveHandler(evt: MouseEvent) {
    if (!scrollWrapRef.current) return;

    const dx = evt.clientX - position.current.x;

    scrollWrapRef.current.scrollLeft = position.current.left - dx;
  }

  return {
    isScrolling,
  };
};

export default useHandleScrollOnMouseEvents;
