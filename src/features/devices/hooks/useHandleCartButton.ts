import { useState } from 'react';

export const CART_BTN_STATE = {
  None: 'NONE',
  Show: 'SHOW',
  Hide: 'HIDE',
} as const;

export type CartBtnState = typeof CART_BTN_STATE[keyof typeof CART_BTN_STATE];

const useHandleCartBtnState = () => {
  const [btnState, setBtnState] = useState<CartBtnState>(CART_BTN_STATE.None);

  const onMouseEnter = () => setBtnState(CART_BTN_STATE.Show);
  const onMouseLeave = () => setBtnState(CART_BTN_STATE.Hide);

  return {
    btnState,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useHandleCartBtnState;
