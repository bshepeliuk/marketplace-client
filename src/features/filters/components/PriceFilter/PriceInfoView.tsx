import React, { useEffect, useRef } from 'react';
import { InputWrapper, Wrap, Input } from '../../styles/filters.styled';
import RangeInput from '../../atoms/RangeInput/RangeInput';
import useFilterContext from '../../hooks/useFilterContext';
import useHandleInputsPrice from '../../hooks/useHandleInputsPrice';
import useHandleRangePrice from '../../hooks/useHandleRangePrice';
import useSyncInputStateWithRangeState from '../../hooks/useSyncInputStateWithRangeState';

interface IProps {
  height: number;
  prices: { min: number; max: number };
}

function PriceInfoView({ height, prices }: IProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const context = useFilterContext();
  const { values, setValues, handleInputChange } = useHandleInputsPrice();
  const { range, setRange, handleRangeChange } = useHandleRangePrice();

  useSyncInputStateWithRangeState({ values, setRange, setValues });

  const isNotInitStateValues = !values.every((value) => Object.values(prices).includes(value) || value === 0);

  useEffect(() => {
    if (isNotInitStateValues && wrapRef.current) {
      const DEFAULT_OFFSET_TOP = 20;

      context.setBtnOffsetY(wrapRef.current.offsetTop + DEFAULT_OFFSET_TOP);
      context.setIsShownApplyBtn(true);
    }

    return () => context.setIsShownApplyBtn(false);
  }, [values]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      context.setPrices(values);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [values]);

  const onRangeChange = (value: number[]) => {
    handleRangeChange(value);

    setValues(value);
  };

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    const { max } = prices;

    const isValueLessThanMin = evt.target.name === 'min' && value > max;
    const isValueGreaterThanMax = evt.target.name === 'max' && max < value;

    if (isValueLessThanMin) {
      setValues([prices.min, values[1]]);
      return;
    }

    if (isValueGreaterThanMax) {
      setValues([values[0], prices.max]);
      return;
    }

    handleInputChange(evt);
  };

  return (
    <Wrap ref={wrapRef} height={height}>
      <InputWrapper>
        <Input name="min" type="text" value={values[0]} onChange={onInputChange} />

        <Input name="max" type="text" value={values[1]} onChange={onInputChange} />
      </InputWrapper>

      <RangeInput min={prices.min} max={prices.max} values={range} onChange={onRangeChange} />
    </Wrap>
  );
}

export default PriceInfoView;
