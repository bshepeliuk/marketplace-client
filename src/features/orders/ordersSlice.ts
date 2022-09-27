import produce from 'immer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IOrder, OrderStatusValues } from '../purchases/types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  items: [] as IOrder[],
};

type State = typeof initialState;

export const getOrders = createAsyncThunk<any, undefined, IThunkAPI>(
  'orders/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Orders.get();

      return {
        orders: data.orders,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const ordersSlice = createSlice({
  initialState,
  name: 'orders',
  reducers: {
    updateOrderStatus(state: State, { payload }: PayloadAction<{ id: number; status: OrderStatusValues }>) {
      const items = produce(state.items, (draft: IOrder[]) => {
        for (const order of draft) {
          const device = order.devices.find((item) => item.orderDevice.id === payload.id);
          if (device) device.orderDevice.status = payload.status;
        }
      });

      state.items = items;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getOrders.fulfilled, (state: State, { payload }: PayloadAction<{ orders: IOrder[] }>) => {
      state.isLoading = false;
      state.items = payload.orders;
    });
    builder.addCase(getOrders.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
