import { ChangeEvent, useEffect, useState } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFilterContext from './useFilterContext';
import validateValuesByMinMaxBounds from '../helpers/validateValuesByMinMaxBounds';

// TODO: refactoring;
const useHandlePriceInputAndRange = () => {
  const options = useTypedSelector((state) => state.filters.options);
  const [range, setRange] = useState<number[]>([0, 0]);
  const [values, setValues] = useState<number[]>([0, 0]);
  const context = useFilterContext();

  const { setPrices, prices } = context;

  const haveMinMaxValues = Object.keys(options.prices).length > 0;

  useEffect(() => {
    if (prices.length > 0) setRange(prices);
  }, []);

  useEffect(() => {
    if (prices.length === 0 && haveMinMaxValues) {
      setRange([options.prices.min, options.prices.max]);
      setValues([options.prices.min, options.prices.max]);
    }
  }, [options.prices]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPrices(range);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [range]);

  useEffect(() => {
    const { min, max } = options.prices;

    validateValuesByMinMaxBounds({
      values: { min: values[0], max: values[1] },
      bounds: { min, max },
    })
      .then((res) => {
        if (res.min && res.max) {
          setRange([res.min, res.max]);
        }
      })
      .catch(() => {
        // TODO: notification;
      });
  }, [values]);

  const handleRangeChange = (value: number[]) => {
    setRange(value);
    setValues(value);
  };

  const handleInputChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber, name } = evt.target;
    const isMinValue = name === 'min';

    if (Number.isNaN(valueAsNumber) || valueAsNumber < 0) return;

    if (isMinValue) {
      setValues([valueAsNumber, values[1]]);
    } else {
      setValues([values[0], valueAsNumber]);
    }
  };

  return {
    range,
    values,
    handleRangeChange,
    handleInputChange,
    minMaxValues: options.prices,
  };
};

export default useHandlePriceInputAndRange;
