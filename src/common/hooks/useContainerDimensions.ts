import { RefObject, useEffect, useState } from 'react';

interface IState {
  width: number;
}

const useContainerDimensions = (containerRef: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<IState>({ width: 0 });

  const getDimensions = () => {
    if (containerRef.current === null) return size;

    return {
      width: containerRef.current.offsetWidth,
    };
  };

  const handleResize = () => {
    setSize(getDimensions());
  };

  useEffect(() => {
    setSize(getDimensions());

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    size,
  };
};

export default useContainerDimensions;
