import styled, { css, keyframes } from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 25px;
  color: #fff;
`;

export const Wrap = styled.div`
  grid-column-start: 4;
  position: relative;

  @media (max-width: 700px) {
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
