import React, { useEffect, useRef } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { InputWrapper, Wrap, Input } from '../../styles/filters.styled';
import RangeInput from '../../atoms/RangeInput/RangeInput';
import useFilterContext from '../../hooks/useFilterContext';
import useHandleInputsPrice from '../../hooks/useHandleInputsPrice';
import useHandleRangePrice from '../../hooks/useHandleRangePrice';
import useSyncInputStateWithRangeState from '../../hooks/useSyncInputStateWithRangeState';

function PriceInfoView() {
  const ref = useRef<HTMLDivElement>(null);

  const options = useTypedSelector((state) => state.filters.options);
  const context = useFilterContext();
  const { values, setValues, handleInputChange } = useHandleInputsPrice();
  const { range, setRange, handleRangeChange } = useHandleRangePrice();

  useSyncInputStateWithRangeState({ values, setRange });

  const isNotInitStateValues = !values.every(
    (value) => Object.values(options.prices).includes(value) || value === 0,
  );

  useEffect(() => {
    if (isNotInitStateValues && ref.current) {
      context.setBtnVerticalOffset(ref.current.offsetTop + 20);
      context.setShowApplyBtn(true);
    }

    return () => context.setShowApplyBtn(false);
  }, [values]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      context.setPrices(values);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [values]);

  const onRangeChange = (value: number[]) => {
    handleRangeChange(value);
    setValues(value);
  };

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(evt);
  };

  return (
    <Wrap ref={ref}>
      <InputWrapper>
        <Input
          name="min"
          type="number"
          value={values[0]}
          onChange={onInputChange}
        />

        <Input
          name="max"
          type="number"
          value={values[1]}
          onChange={onInputChange}
        />
      </InputWrapper>

      <RangeInput
        min={options.prices.min}
        max={options.prices.max}
        values={range}
        onChange={onRangeChange}
      />
    </Wrap>
  );
}

export default PriceInfoView;
