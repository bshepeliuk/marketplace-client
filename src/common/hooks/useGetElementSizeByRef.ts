import { RefObject, useEffect, useState } from 'react';

interface ISize {
  width: number;
  height: number;
}

const useGetElementSizeByRef = (elementRef: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<ISize>({ height: 0, width: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    const { clientHeight, clientWidth } = elementRef.current;

    setSize({
      height: clientHeight ?? 0,
      width: clientWidth ?? 0,
    });
  }, []);

  return size;
};

export default useGetElementSizeByRef;
