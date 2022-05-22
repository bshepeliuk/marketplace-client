import styled, { css, keyframes } from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  height: 80px;
  align-items: center;
  padding: 10px 20px;
  display: flex;
  background-color: #303030;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: 200px 200px 1fr 50px 180px;
  justify-items: center;
`;

export const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.01);
    letter-spacing: 2px;
  }
`;

export const LoginLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  grid-column-start: 5;
  text-transform: uppercase;
  font-size: 14px;
`;

export const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 25px;
  color: #fff;
`;

export const Wrap = styled.div`
  grid-column-start: 4;
  position: relative;
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

export const CartCounter = styled.div`
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
  top: -10px;
  right: -12px;
`;

export const Text = styled.p<{ hasIncremented: boolean }>`
  margin: 0;
  animation: ${(props) => {
    if (!props.hasIncremented) return '';
    return css`0.3s ${count} ease-in-out both`;
  }};
`;
