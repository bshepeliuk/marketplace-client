import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import {
  AccordingHeader,
  ArrowIcon,
  Input,
  InputWrapper,
  Wrap,
} from '../styles/filters.styled';
import RangeInput from '../atoms/RangeInput/RangeInput';
import { useFilterContext } from '../context/FilterContext';

function PriceFilterView() {
  const [isVisible, setVisible] = useState<boolean>(true);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isVisible} />
        <div>Price</div>
      </AccordingHeader>

      {isVisible && <PriceInfoView />}
    </div>
  );
}

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
      // 20 - padding top;
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

export default PriceFilterView;
