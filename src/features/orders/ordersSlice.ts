import produce from 'immer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI, Nullable } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IOrder, OrderStatusValues } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  total: null as Nullable<number>,
  items: [] as IOrder[],
};

type State = typeof initialState;

interface IOrdersData {
  total: number;
  orders: IOrder[];
}

export const getOrders = createAsyncThunk<IOrdersData, { limit: number; offset: number }, IThunkAPI>(
  'orders/get-all',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Orders.get({ limit, offset });

      return {
        total: data.total,
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
    builder.addCase(getOrders.fulfilled, (state: State, { payload }: PayloadAction<IOrdersData>) => {
      state.isLoading = false;
      state.items = payload.orders;
      state.total = payload.total;
    });
    builder.addCase(getOrders.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
