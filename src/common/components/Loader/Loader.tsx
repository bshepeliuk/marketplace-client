import React from 'react';
import { LoaderSvg } from './loader.styled';

interface IProps {
  size: number;
  color: string;
  strokeWidth: number;
}

function LoaderView(props: IProps) {
  const { size = 0, color = '#bdc3c7', strokeWidth = 5 } = props;

  const leftAndTopOffset = 1;
  const radius = size / 2;
  const radiusWithOffset = radius - leftAndTopOffset;
  const perimeter = Math.round(2 * Math.PI * radius);

  return (
    <LoaderSvg
      size={size}
      color={color}
      perimeter={perimeter}
      strokeWidth={strokeWidth}
    >
      <circle
        cx={radiusWithOffset}
        cy={radiusWithOffset}
        r={radiusWithOffset}
      />
    </LoaderSvg>
  );
}

export default LoaderView;
