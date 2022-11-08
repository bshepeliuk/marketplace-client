import { RefObject, useRef, TouchEvent } from 'react';

interface IProps {
  ref: RefObject<HTMLElement | null>;
}

const useScrollOnTouchEvents = ({ ref }: IProps) => {
  const position = useRef({ x: 0, left: 0 });

  const onTouchMove = (evt: TouchEvent) => {
    if (ref.current === null) return;

    const dx = evt.touches[0].clientX - position.current.x;

    ref.current.scrollLeft = position.current.left - dx;
  };
  const onTouchStart = (evt: TouchEvent) => {
    const scrollLeft = ref.current === null ? 0 : ref.current.scrollLeft;
    position.current = { x: evt.touches[0].clientX, left: scrollLeft };
  };

  return {
    onTouchMove,
    onTouchStart,
  };
};

export default useScrollOnTouchEvents;
