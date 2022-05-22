import React from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useHandleCartBtnState from '../hooks/useHandleCartButton';
import { CartButton } from '../styles/deviceItem.styled';

interface Props {
  onClick?: () => void;
  inCart: boolean;
}

function AddToCartButton({ inCart, onClick = () => {} }: Props) {
  // prettier-ignore
  // eslint-disable-next-line max-len
  const { onMouseEnter, onMouseLeave, btnState } = useHandleCartBtnState();

  return (
    <CartButton
      type="button"
      onClick={onClick}
      inCart={inCart}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      btnState={btnState}
    >
      <div className="cart-btn-title">{inCart ? 'remove' : 'add'}</div>

      {inCart ? (
        <BsCartCheck size="35px" color="#1abc9c" />
      ) : (
        <AiOutlineShoppingCart size="35px" color="#fff" />
      )}
    </CartButton>
  );
}

export default AddToCartButton;
