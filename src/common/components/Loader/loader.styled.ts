import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  };

  100% {
    transform: rotate(360deg);
  }
`;

const animate = (perimeter: number) => keyframes`
  0%, 100% {
    stroke-dashoffset: ${perimeter};
  };

  50% {
    stroke-dashoffset: 0;
  };

  50.1% {
    stroke-dashoffset: ${perimeter * 2};
  };
`;

export const LoaderSvg = styled.svg<{
  size: number;
  color: string;
  perimeter: number;
  strokeWidth: number;
}>`
  position: relative;
  z-index: 5;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  animation: 1.5s ${rotate} linear infinite;

  circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: ${(props) => props.strokeWidth};
    stroke: ${(props) => props.color};
    transform: translate(1px, 1px);
    stroke-linecap: round;
    stroke-dasharray: ${(props) => props.perimeter};
    stroke-dashoffset: ${(props) => props.perimeter};
    animation: 4s ${(props) => animate(props.perimeter)} linear infinite;
  }
`;
