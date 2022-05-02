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
    }

    100% {
      top: ${current}px;
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
