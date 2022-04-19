import { ChangeEvent, useEffect, useState } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFilterContext from './useFilterContext';

const useHandlePriceInputAndRange = () => {
  const options = useTypedSelector((state) => state.filters.options);
  const [values, setValues] = useState<number[]>([0, 0]);
  const context = useFilterContext();

  const { setPrices, prices } = context;

  const haveMinMaxValues = Object.keys(options.prices).length > 0;

  useEffect(() => {
    if (prices.length > 0) setValues(prices);
  }, []);

  useEffect(() => {
    if (prices.length === 0 && haveMinMaxValues) {
      setValues([options.prices.min, options.prices.max]);
    }
  }, [options.prices]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setPrices(values), 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [values]);
  // TODO: validation for number input; min & values;
  const handleRangeChange = (value: number[]) => setValues(value);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // TODO: validation for number input; min & values;
    const value = evt.target.valueAsNumber;

    if (Number.isNaN(value)) return;

    if (evt.target.name === 'min') {
      setValues([value, values[1]]);
    } else {
      setValues([values[0], value]);
    }
  };

  return {
    values,
    handleRangeChange,
    handleInputChange,
    minMaxValues: options.prices,
  };
};

export default useHandlePriceInputAndRange;
