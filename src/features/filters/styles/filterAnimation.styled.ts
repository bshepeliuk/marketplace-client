import { keyframes } from 'styled-components';

export const showByHeight = (height: number | null) => keyframes`
  0% {
    height: 0;
    opacity: 0;
  }

  100% {
    height: ${height}px;
    opacity: 1;
  }
`;

export const hideByHeight = (height: number | null) => keyframes`
  0% {
    height: ${height}px;
    opacity: 1;
  }

  100% {
    height: 0;
    opacity: 0;
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

export const showFilterItem = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const removeFilterItem = (width: number | null) => keyframes`
  0% {
    width: ${width}px;
  }

  100% {
    opacity: 0;
    width: 0;
  }
`;
