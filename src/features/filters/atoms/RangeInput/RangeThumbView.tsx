import React from 'react';
import { IThumbProps } from 'react-range/lib/types';

interface IProps {
  props: IThumbProps;
  isDragged: boolean;
}

function RangeThumbView({ props, isDragged }: IProps) {
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

export default RangeThumbView;
