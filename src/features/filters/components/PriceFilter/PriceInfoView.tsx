import React, { useEffect, useRef } from 'react';
import { InputWrapper, Wrap, Input } from '../../styles/filters.styled';
import RangeInput from '../../atoms/RangeInput/RangeInput';
import useHandlePriceInputAndRange from '../../hooks/useHandlePriceInputAndRange';
import useFilterContext from '../../hooks/useFilterContext';

function PriceInfoView() {
  const ref = useRef<HTMLDivElement>(null);
  const props = useHandlePriceInputAndRange();
  const context = useFilterContext();
  // prettier-ignore
  const { setShowApplyBtn, setBtnVerticalOffset } = context;
  const { values, minMaxValues, handleRangeChange, handleInputChange } = props;

  const isNotInitStateValues = !values.every(
    (value) => Object.values(minMaxValues).includes(value) || value === 0,
  );

  useEffect(() => {
    if (!ref.current) return;

    if (isNotInitStateValues) {
      setBtnVerticalOffset(ref.current.offsetTop + 20);
      setShowApplyBtn(true);
    }

    return () => {
      setShowApplyBtn(false);
    };
  }, [values]);

  return (
    <Wrap ref={ref}>
      <InputWrapper>
        <Input
          name="min"
          type="number"
          value={values[0]}
          onChange={handleInputChange}
        />

        <Input
          name="max"
          type="number"
          value={values[1]}
          onChange={handleInputChange}
        />
      </InputWrapper>

      <RangeInput
        min={minMaxValues.min}
        max={minMaxValues.max}
        values={values}
        onChange={handleRangeChange}
      />
    </Wrap>
  );
}

export default PriceInfoView;
