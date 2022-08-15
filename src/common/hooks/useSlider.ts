import { useEffect, useRef, useState } from 'react';

interface ISliderProps {
  startIdx?: number;
  lastIdx: number;
}

export const SlideDirection = {
  None: 'none',
  Left: 'left',
  Right: 'right',
} as const;

export type SliderDirectionKeys = keyof typeof SlideDirection;
export type SliderDirectionValues = typeof SlideDirection[SliderDirectionKeys];

const ANIMATION_TIME_MS = 590;

const useSlider = ({ startIdx = 0, lastIdx }: ISliderProps) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [slideDirection, setSlideDirection] = useState<SliderDirectionValues>(
    SlideDirection.None,
  );
  const [activeIdx, setActiveIdx] = useState(startIdx);

  useEffect(() => {
    setSlideDirection(SlideDirection.None);
  }, [activeIdx]);

  const onLeftClick = () => {
    if (timeoutId.current !== undefined) {
      clearTimeout(timeoutId.current);
    }

    setSlideDirection(SlideDirection.Left);

    timeoutId.current = setTimeout(() => {
      if (activeIdx !== 0) {
        setActiveIdx((prevIdx) => prevIdx - 1);
      } else {
        setActiveIdx(lastIdx);
      }
    }, ANIMATION_TIME_MS);
  };

  const onRightClick = () => {
    if (timeoutId.current !== undefined) {
      clearTimeout(timeoutId.current);
    }

    setSlideDirection(SlideDirection.Right);

    timeoutId.current = setTimeout(() => {
      if (activeIdx !== lastIdx) {
        setActiveIdx((prevIdx) => prevIdx + 1);
      } else {
        setActiveIdx(0);
      }
    }, ANIMATION_TIME_MS);
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
