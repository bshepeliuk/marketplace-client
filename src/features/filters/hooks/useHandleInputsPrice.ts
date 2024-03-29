import { useState, ChangeEvent } from 'react';

const useHandleInputsPrice = () => {
  const [values, setValues] = useState<number[]>([0, 0]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    const isMinValue = name === 'min';

    const valueAsNumber = Number(value);

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
