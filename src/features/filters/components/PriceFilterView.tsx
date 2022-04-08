import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IThumbProps, ITrackProps } from 'react-range/lib/types';
import { getTrackBackground, Range } from 'react-range';
import { AccordingHeader, ArrowIcon } from '../styles/filters.styled';
import { IMinMaxPrice } from '../filtersSlice';

function PriceFilterView() {
  const [isItVisible, setVisible] = useState<boolean>(true);
  const { prices } = useTypedSelector((state) => state.filters.options);

  const [values, setValues] = useState<number[]>([0, 0]);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (prices.hasOwnProperty('max')) {
      setValues([prices.min, prices.max]);
    }
  }, [prices]);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const handleChange = (value: number[]) => setValues(value);

  const renderTrack = (trackProps: {
    props: ITrackProps;
    children: React.ReactNode;
  }) => <RangeTrackView {...trackProps} values={values} prices={prices} />;

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
        <ArrowIcon isItVisible={isItVisible} />
        <div>Price</div>
      </AccordingHeader>

      {isItVisible && (
        <div>
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

          <Range
            step={1}
            draggableTrack
            min={prices.min}
            max={prices.max}
            values={values}
            onChange={handleChange}
            renderTrack={renderTrack}
            renderThumb={RangeThumbView}
          />
        </div>
      )}
    </div>
  );
}

function RangeTrackView({
  props,
  children,
  values,
  prices,
}: {
  props: ITrackProps;
  prices: IMinMaxPrice;
  children: React.ReactNode;
  values: number[];
}) {
  const trackStyles = {
    ...props.style,
    height: '36px',
    display: 'flex',
    width: '100%',
    padding: '0px 5px',
  };

  const rangeStyles = {
    height: '5px',
    width: '100%',
    borderRadius: '4px',
    background: getTrackBackground({
      values,
      colors: ['#ccc', '#548BF4', '#ccc'],
      min: prices.min,
      max: prices.max,
    }),
    alignSelf: 'center',
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={trackStyles}
    >
      <div ref={props.ref} style={rangeStyles}>
        {children}
      </div>
    </div>
  );
}

function RangeThumbView({
  props,
  isDragged,
}: {
  props: IThumbProps;
  isDragged: boolean;
}) {
  const thumbWrapStyles = {
    ...props.style,
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    backgroundColor: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: isDragged ? '#548BF4 solid 2px' : 'none',
  };

  const thumbItemStyles = {
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    border: '2px solid #fff',
    backgroundColor: isDragged ? '#CCC' : '#548BF4',
  };

  return (
    <div {...props} style={thumbWrapStyles}>
      <div style={thumbItemStyles} />
    </div>
  );
}

export default PriceFilterView;
