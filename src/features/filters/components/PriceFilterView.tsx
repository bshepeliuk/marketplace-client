import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import usePrevious from '@src/common/hooks/usePrevious';
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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState<boolean>(true);
  const { prices } = useTypedSelector((state) => state.filters.options);
  const [values, setValues] = useState<number[]>([0, 0]);
  const prevValues = usePrevious(values);
  const context = useFilterContext();
  // prettier-ignore
  const {
    setShowApplyBtn,
    setBtnVerticalOffset,
    setPrices
  } = context;

  const isItInitValues = () => {
    return values.every(
      (value) => Object.values(prices).includes(value) || value === 0,
    );
  };

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (prices.hasOwnProperty('max')) {
      setValues([prices.min, prices.max]);
    }
  }, [prices]);

  // FIXME: don't show button in case prev values is the same;
  useEffect(() => {
    if (prevValues === undefined || prevValues[0] === values[0]) {
      setShowApplyBtn(false);
      return;
    }

    if (isVisible) {
      setShowApplyBtn(true);
    } else {
      setShowApplyBtn(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (ref.current) {
      const { offsetTop } = ref.current;

      const offset = offsetTop + 20; // 20 - padding top

      if (!isItInitValues()) {
        setBtnVerticalOffset(offset);
        setShowApplyBtn(true);
      }
    }

    const timeoutId = setTimeout(() => setPrices(values), 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [values]);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const handleRangeChange = (value: number[]) => setValues(value);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'min') {
      setValues([evt.target.valueAsNumber, values[1]]);
    } else {
      setValues([values[0], evt.target.valueAsNumber]);
    }
  };

  return (
    <div>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isVisible} />
        <div>Price</div>
      </AccordingHeader>

      {isVisible && (
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
            min={prices.min}
            max={prices.max}
            values={values}
            onChange={handleRangeChange}
          />
        </Wrap>
      )}
    </div>
  );
}

export default PriceFilterView;
