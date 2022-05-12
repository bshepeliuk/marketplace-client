import styled, { css } from 'styled-components';
import { slowHeight } from './filterAnimation.styled';

interface IBtnProps {
  btnOffsetY: number;
  shouldShow: boolean;
  prevOffset: number | undefined;
}

export const Wrap = styled.div<IBtnProps>`
  box-shadow: 0 8px 25px rgb(48 48 48 / 20%);
  z-index: 2;
  position: absolute;
  right: 5px;
  top: ${({ btnOffsetY }) => {
    return css`
      ${btnOffsetY}px
    `;
  }};

  display: ${({ shouldShow }) => {
    return shouldShow ? 'block' : 'none';
  }};

  animation: 0.3s ${(props) => slowHeight(props.prevOffset, props.btnOffsetY)}
    ease-in-out backwards;
`;
