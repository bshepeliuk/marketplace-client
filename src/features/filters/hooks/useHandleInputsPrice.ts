import { useEffect, useState, ChangeEvent } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useFilterContext from './useFilterContext';

const useHandleInputsPrice = () => {
  const [values, setValues] = useState<number[]>([0, 0]);
  const options = useTypedSelector((state) => state.filters.options);
  const context = useFilterContext();

  const { prices } = context;

  const haveMinMaxValues = Object.keys(options.prices).length > 0;

  useEffect(() => {
    if (prices.length === 0 && haveMinMaxValues) {
      setValues([options.prices.min, options.prices.max]);
    }
  }, [options.prices]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
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
    values,
    setValues,
    handleInputChange,
  };
};

export default useHandleInputsPrice;
