import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  };

  100% {
    transform: rotate(360deg);
  }
`;

const animate = keyframes`
  0%, 100% {
    stroke-dashoffset: 440;
  };

  50% {
    stroke-dashoffset: 0;
  };

  50.1% {
    stroke-dashoffset: 880;
  };
`;

const Svg = styled.svg`
  position: relative;
  z-index: 5;
  width: 150px;
  height: 150px;
  animation: 2s ${rotate} linear infinite;

  circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 10;
    stroke: green;
    transform: translate(5px, 5px);
    stroke-linecap: round;
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: 4s ${animate} linear infinite;
  }
`;

function Loader() {
  const size = 70;
  return (
    <Svg>
      <circle cx={size} cy={size} r={size} />
    </Svg>
  );
}

export default Loader;
