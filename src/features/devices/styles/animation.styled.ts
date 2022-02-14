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

export const showDeviceAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const goToTopArrowAnimation = keyframes`
  0% {
    opacity: 0;
    margin-top: 35px;
  }

  100% {
    opacity: 1;
    margin-top: 0;
  }
`;
