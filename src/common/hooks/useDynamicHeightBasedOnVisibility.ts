import { useEffect, useRef, useState } from 'react';

const useDynamicHeightBasedOnVisibility = <T extends HTMLElement>(isOpen: boolean) => {
  const wrapperRef = useRef<T>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const prevHeight = useRef<number | undefined>();

  useEffect(() => {
    prevHeight.current = wrapperRef.current?.getBoundingClientRect().height;
  }, []);

  useEffect(() => {
    if (isOpen) {
      const nextHeight = prevHeight.current || wrapperRef.current?.getBoundingClientRect().height;

      setHeight(nextHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return {
    height,
    wrapperRef,
  };
};

export default useDynamicHeightBasedOnVisibility;
