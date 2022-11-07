import { useEffect, useRef, useState, RefObject } from 'react';

interface IProps<T> {
  ref: RefObject<HTMLDivElement | null>;
  deps?: T[];
}

const useHandleScrollOnMouseEvents = <T>({ ref, deps }: IProps<T>) => {
  const position = useRef({ x: 0, left: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener('mousedown', onDownHandler);

    return () => {
      ref.current?.removeEventListener('mousedown', onDownHandler);
    };
  }, [deps]);

  function onDownHandler(evt: MouseEvent) {
    if (!ref.current) return;

    setIsScrolling(true);

    position.current.x = evt.clientX;
    position.current.left = ref.current.scrollLeft;

    ref.current.addEventListener('mousemove', onMoveHandler);
    document.addEventListener('mouseup', onUpHandler);
  }

  function onUpHandler() {
    if (!ref.current) return;

    setIsScrolling(false);

    ref.current.removeEventListener('mousemove', onMoveHandler);
    document.removeEventListener('mouseup', onUpHandler);
  }

  function onMoveHandler(evt: MouseEvent) {
    if (!ref.current) return;

    const dx = evt.clientX - position.current.x;

    ref.current.scrollLeft = position.current.left - dx;
  }

  return {
    isScrolling,
  };
};

export default useHandleScrollOnMouseEvents;
