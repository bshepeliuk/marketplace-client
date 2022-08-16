import { useEffect, useRef, useState } from 'react';

interface ISliderProps {
  startIdx?: number;
  lastIdx: number;
  delay?: number;
}

export const SlideDirection = {
  None: 'none',
  Left: 'left',
  Right: 'right',
} as const;

export type SliderDirectionKeys = keyof typeof SlideDirection;
export type SliderDirectionValues = typeof SlideDirection[SliderDirectionKeys];

const useSlider = ({ startIdx = 0, lastIdx, delay = 0 }: ISliderProps) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [slideDirection, setSlideDirection] = useState<SliderDirectionValues>(
    SlideDirection.None,
  );
  const [activeIdx, setActiveIdx] = useState(startIdx);

  useEffect(() => {
    setSlideDirection(SlideDirection.None);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, [activeIdx]);

  const onLeftClick = () => {
    setSlideDirection(SlideDirection.Left);

    timeoutId.current = setTimeout(() => {
      if (activeIdx !== 0) {
        setActiveIdx((prevIdx) => prevIdx - 1);
      } else {
        setActiveIdx(lastIdx);
      }
    }, delay);
  };

  const onRightClick = () => {
    setSlideDirection(SlideDirection.Right);

    timeoutId.current = setTimeout(() => {
      if (activeIdx !== lastIdx) {
        setActiveIdx((prevIdx) => prevIdx + 1);
      } else {
        setActiveIdx(0);
      }
    }, delay);
  };

  return {
    slideDirection,
    activeIdx,
    setActiveIdx,
    onLeftClick,
    onRightClick,
  };
};

export default useSlider;
