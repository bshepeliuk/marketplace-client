import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevice } from '../devices/types';

export const initialState = {
  isError: false,
  isLoading: false,
  items: [] as IDevice[],
};

type State = typeof initialState;

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addToCart(state: State, { payload }: PayloadAction<{ device: IDevice }>) {
      state.items.push(payload.device);
    },
    removeFromCart(state: State, { payload }: PayloadAction<{ device: IDevice }>) {
      state.items = state.items.filter((i) => i.id !== payload.device.id);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
