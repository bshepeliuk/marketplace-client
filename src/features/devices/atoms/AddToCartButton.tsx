import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useHandleCartButton from '../hooks/useHandleCartButton';
import { CartButton } from '../styles/deviceItem.styled';

interface Props {
  onClick?: () => void;
}

function AddToCartButton({ onClick = () => {} }: Props) {
  // prettier-ignore
  // eslint-disable-next-line max-len
  const { onMouseEnter, onMouseLeave, currentButtonState } = useHandleCartButton();

  return (
    <CartButton
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      currentButtonState={currentButtonState}
    >
      <div className="cart-btn-title">add to cart</div>
      <AiOutlineShoppingCart size="35px" />
    </CartButton>
  );
}

export default AddToCartButton;
