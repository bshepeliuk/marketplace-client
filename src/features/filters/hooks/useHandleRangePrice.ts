import { useState } from 'react';

export const useHandleRangePrice = () => {
  const [range, setRange] = useState<number[]>([0, 0]);

  const handleRangeChange = (value: number[]) => {
    setRange(value);
  };

  return {
    range,
    setRange,
    handleRangeChange,
  };
};

export default useHandleRangePrice;
