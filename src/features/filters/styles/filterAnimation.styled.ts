import { keyframes } from 'styled-components';

export const showByHeight = (height: number | null) => keyframes`
  0% {
    height: 0;
  }

  100% {
    height: ${height}px;
  }
`;

export const hideByHeight = (height: number | null) => keyframes`
  0% {
    height: ${height}px;
  }

  100% {
    height: 0;
  }
`;

export const slowHeight = (prev: number | undefined, current: number) => {
  return keyframes`
    0% {
      top: ${prev}px;
    }

    100% {
      top: ${current}px;
    }
  `;
};
