import { RefObject, useEffect, useState } from 'react';

interface IState {
  width: number;
}

const useContainerDimensions = (containerRef: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<IState>({ width: 0 });

  const getDimensions = () => ({
    width: containerRef.current!.offsetWidth,
  });

  const handleResize = () => {
    setSize(getDimensions());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSize(getDimensions());
  }, [containerRef.current]);

  return {
    size,
  };
};

export default useContainerDimensions;
