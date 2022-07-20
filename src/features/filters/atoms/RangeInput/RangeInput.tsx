import React from 'react';
import { ITrackProps } from 'react-range/lib/types';
import { Range } from 'react-range';
import RangeTrackView from './RangeTrackView';
import RangeThumbView from './RangeThumbView';

interface IProps {
  min: number;
  max: number;
  values: number[];
  onChange: (values: number[]) => void;
}

function RangeInput({ min, max, values, onChange }: IProps) {
  if (values[0] === 0 && values[1] === 0) return null;

  const renderTrack = (trackProps: {
    props: ITrackProps;
    children: React.ReactNode;
  }) => <RangeTrackView {...trackProps} values={values} min={min} max={max} />;

  return (
    <Range
      step={1}
      draggableTrack
      min={min}
      max={max}
      values={values}
      onChange={onChange}
      renderTrack={renderTrack}
      renderThumb={RangeThumbView}
    />
  );
}

export default RangeInput;
