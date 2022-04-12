import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import useCheckFirstRender from '@common/hooks/useCheckFirstRender';
import { AccordingHeader, ArrowIcon } from '../styles/filters.styled';
import RangeInput from '../atoms/RangeInput/RangeInput';
import { useFilterContext } from '../context/FilterContext';

function PriceFilterView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState<boolean>(true);
  const { prices } = useTypedSelector((state) => state.filters.options);
  const [values, setValues] = useState<number[]>([0, 0]);
  const context = useFilterContext();
  const isItFirstRender = useCheckFirstRender();
  // prettier-ignore
  const {
    setShowApplyBtn,
    hasSelectedItems,
    setBtnVerticalOffset,
    setPrices
  } = context;

  const isItInitValues = () => {
    // FIXME: refactoring;
    const isInit = values.every((value) =>
      Object.values(prices).includes(value),
    );

    const isDefault = values[0] === 0 && values[1] === 0; // [number, number];

    return isInit || isDefault;
  };

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (prices.hasOwnProperty('max')) {
      setValues([prices.min, prices.max]);
    }
  }, [prices]);

  // TODO: create hook for using between two components
  useEffect(() => {
    if (isItFirstRender || !hasSelectedItems) return;

    if (isVisible) {
      setShowApplyBtn(true);
    } else {
      setShowApplyBtn(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (ref.current) {
      const { offsetTop } = ref.current;
      const { height } = ref.current.getBoundingClientRect();

      const offset = offsetTop + height / 2;

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
        <div ref={ref} style={{ height: '100px' }}>
          <div>
            <input
              name="min"
              type="number"
              value={values[0]}
              onChange={handleInputChange}
            />

            <input
              name="max"
              type="number"
              value={values[1]}
              onChange={handleInputChange}
            />
          </div>

          <RangeInput
            min={prices.min}
            max={prices.max}
            values={values}
            onChange={handleRangeChange}
          />
        </div>
      )}
    </div>
  );
}

export default PriceFilterView;
