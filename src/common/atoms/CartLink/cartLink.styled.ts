import styled, { keyframes } from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 25px;
  color: #fff;
`;

export const Wrap = styled.div`
  grid-column-start: 5;
  position: relative;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const count = keyframes`
  0% {
    opacity: 0;
    margin-top: 10px;
  };

  100%{
    margin-top: 0;
    opacity: 1;
  };
`;

export const CustomLink = styled(Link)`
  display: flex;
  padding: 10px;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #565656;
    border-radius: 3px;
  }
`;

export const Counter = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 3px;
  min-width: 20px;
  max-width: 44px;
  height: 20px;
  background-color: #e31837;
  border-radius: 10px;
  color: #fff;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -6px;
`;

export const Text = styled.p`
  margin: 0;
  animation: 0.3s ${count} ease-in-out both;
`;
