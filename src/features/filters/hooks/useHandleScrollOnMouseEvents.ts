import { useEffect, useRef, useState } from 'react';

const useHandleScrollOnMouseEvents = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, left: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    wrapRef.current?.addEventListener('mousedown', onDownHandler);

    return () => {
      wrapRef.current?.removeEventListener('mousedown', onDownHandler);
    };
  }, []);

  function onDownHandler(evt: MouseEvent) {
    if (!wrapRef.current) return;

    setIsScrolling(true);

    position.current.x = evt.clientX;
    position.current.left = wrapRef.current.scrollLeft;

    wrapRef.current.addEventListener('mousemove', onMoveHandler);
    document.addEventListener('mouseup', onUpHandler);
  }

  function onUpHandler() {
    if (!wrapRef.current) return;

    setIsScrolling(false);

    wrapRef.current.removeEventListener('mousemove', onMoveHandler);
    document.removeEventListener('mouseup', onUpHandler);
  }

  function onMoveHandler(evt: MouseEvent) {
    if (!wrapRef.current) return;

    const dx = evt.clientX - position.current.x;

    wrapRef.current.scrollLeft = position.current.left - dx;
  }

  return {
    wrapRef,
    isScrolling,
  };
};

export default useHandleScrollOnMouseEvents;
