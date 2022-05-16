import styled from 'styled-components';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { goToTopArrowAnimation } from './animation.styled';

export const GoToTopButton = styled.button`
  position: fixed;
  z-index: 1;
  bottom: 30px;
  right: 30px;
  background-color: #34495e;
  border: none;
  border-radius: 2px;
  color: #fff;
  width: 50px;
  height: 30px;
`;

export const GoToTopIcon = styled(MdOutlineDoubleArrow)`
  font-size: 20px;
  transform: rotate(-90deg);
  animation: 0.5s ${goToTopArrowAnimation} ease-in-out forwards;
`;
