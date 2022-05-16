import React from 'react';
import { ITrackProps } from 'react-range/lib/types';
import { getTrackBackground } from 'react-range';

interface IProps {
  props: ITrackProps;
  min: number;
  max: number;
  children: React.ReactNode;
  values: number[];
}

function RangeTrackView({ props, children, values, min, max }: IProps) {
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
      min,
      max,
      colors: ['#ccc', '#548BF4', '#ccc'],
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

export default RangeTrackView;
