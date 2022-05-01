import styled, { css, keyframes } from 'styled-components';

interface IBtnProps {
  btnVerticalOffset: number;
  shouldShow: boolean;
  prevOffset: number | undefined;
}

const show = (prev: number | undefined, current: number) => {
  return keyframes`
    0% {
      top: ${prev}px;
      opacity: 0;
      transform: scale(1);
    }

    50% {
      transform: scale(1.1);
      opacity: 0.5;
    }

    100% {
      margin-top: 10px;
      top: ${current}px;
      opacity: 1;
      transform: scale(1);
    }
  `;
};

export const Wrap = styled.div<IBtnProps>`
  box-shadow: 0 8px 25px rgb(48 48 48 / 20%);
  z-index: 2;
  position: absolute;
  right: 5px;
  top: ${({ btnVerticalOffset }) => {
    return css`
      ${btnVerticalOffset}px
    `;
  }};

  display: ${({ shouldShow }) => {
    return shouldShow ? 'block' : 'none';
  }};

  animation: 0.5s ${(props) => show(props.prevOffset, props.btnVerticalOffset)}
    ease-in-out backwards;
`;
