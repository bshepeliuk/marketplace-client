import styled from 'styled-components';
import { BiChevronLeft } from 'react-icons/bi';
import { goToTopArrowAnimation } from './animation.styled';

export const GoToTopButton = styled.button`
  position: fixed;
  z-index: 1;
  bottom: 30px;
  right: 30px;
  background-color: #34495e;
  border: none;
  border-radius: 2px;
  color: #303030;
  width: 50px;
  height: 30px;
  position: fixed;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 40%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const GoToTopIcon = styled(BiChevronLeft)`
  font-size: 20px;
  transform: rotate(90deg);
  animation: 0.5s ${goToTopArrowAnimation} ease-in-out forwards;
`;
