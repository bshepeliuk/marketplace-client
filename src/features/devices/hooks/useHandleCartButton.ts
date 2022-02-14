import { useState } from 'react';

export const CART_BTN_STATE = {
  None: 'NONE',
  Show: 'SHOW',
  Hide: 'HIDE',
} as const;

export type CartBtnState = typeof CART_BTN_STATE[keyof typeof CART_BTN_STATE];

const useHandleCartButton = () => {
  const [currentButtonState, setButtonState] = useState<CartBtnState>(
    CART_BTN_STATE.None,
  );

  const onMouseEnter = () => setButtonState(CART_BTN_STATE.Show);
  const onMouseLeave = () => setButtonState(CART_BTN_STATE.Hide);

  return {
    currentButtonState,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useHandleCartButton;
