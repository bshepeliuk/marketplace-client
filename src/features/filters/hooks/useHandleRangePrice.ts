import { useEffect, useState } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFilterContext from './useFilterContext';

export const useHandleRangePrice = () => {
  const [range, setRange] = useState<number[]>([0, 0]);
  const options = useTypedSelector((state) => state.filters.options);
  const context = useFilterContext();

  const { prices } = context;

  const haveMinMaxValues = Object.keys(options.prices).length > 0;

  useEffect(() => {
    if (prices.length === 0 && haveMinMaxValues) {
      setRange([options.prices.min, options.prices.max]);
    }
  }, [options.prices]);

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
