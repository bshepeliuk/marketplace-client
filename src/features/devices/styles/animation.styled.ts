import { keyframes } from 'styled-components';

export const showCartBtnTitle = keyframes`
  0% {
    width: 0;
    opacity: 0;

  }

  100% {
    width: 70px;
    opacity: 1;

  }
`;

export const hideCartBtnTitle = keyframes`
  0% {
    width: 70px;
    opacity: 1;

  }

  50% {
    opacity: 0;
  }

  100% {
    width: 0;

  }
`;
