import React from 'react';
import { FaBalanceScale } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { CartBtnState, CART_BTN_STATE } from '../hooks/useHandleCartButton';
import {
  hideCartBtnTitle,
  showCartBtnTitle,
  showDeviceAnimation,
} from './animation.styled';

export const ListItem = styled.li`
  list-style-type: none;
  border: 1px solid rgba(189, 195, 199, 0.3);
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0px 5px 10px 2px rgba(115, 124, 131, 0.08) inset;
  animation: 0.5s ${showDeviceAnimation} ease-in-out forwards;

  display: grid;
  grid-template-areas:
    'IMAGE IMAGE'
    'TITLE TITLE'
    'RATING BALANCE-SCALE'
    'PRICE BUTTON';

  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
`;

export const BalanceScaleIcon = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isUnique, ...props }) => <FaBalanceScale {...props} />,
)`
  cursor: pointer;
  font-size: 20px;
  grid-area: BALANCE-SCALE;
  justify-self: end;
  align-self: center;
  color: ${(props) => (props.isUnique ? '#5285cc' : '#bdc3c7')};
`;

export const DeviceTitleLink = styled(Link)`
  grid-area: TITLE;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  color: #303030;

  &:hover {
    color: #5285cc;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const ImageWrapper = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  grid-area: IMAGE;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(236, 240, 241, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #34495e;
`;

export const Price = styled.p`
  grid-area: PRICE;
  margin: 0;
  align-self: center;
`;

export const RatingWrapper = styled.div`
  grid-area: RATING;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

export const RatingTitle = styled.div`
  font-size: 11px;
  line-height: 14px;
  color: #f97988;
  user-select: none;
`;

export const CartBtnWrapper = styled.div`
  grid-area: BUTTON;
  justify-self: end;
`;

export const CartButton = styled.button<{
  btnState: CartBtnState;
  inCart: boolean;
}>`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px;
  transition: all 0.4s ease-in-out;

  background-color: ${(props) => {
    return props.inCart ? '#f2f2f2' : '#e31837';
  }};

  color: ${(props) => {
    return props.inCart ? '#1abc9c' : '#fff';
  }};

  .cart-btn-title {
    opacity: 0;
    width: 0;
    white-space: nowrap;
    overflow: hidden;

    animation: ${({ btnState }) => {
      if (btnState === CART_BTN_STATE.None) return '';

      if (btnState === CART_BTN_STATE.Show) {
        return css`80ms ${showCartBtnTitle} ease-out forwards`;
      }

      if (btnState === CART_BTN_STATE.Hide) {
        return css`80ms ${hideCartBtnTitle} ease-out forwards`;
      }
    }};
  }
`;
