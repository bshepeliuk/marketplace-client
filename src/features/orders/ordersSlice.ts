import produce from 'immer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetOrdersParams } from '@src/common/types/apiTypes';
import * as Api from '@src/common/api/Api';
import { IThunkAPI, Nullable } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IOrder, OrderStatusValues } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  notFound: false,
  total: null as Nullable<number>,
  items: [] as IOrder[],
};

type State = typeof initialState;

interface IOrdersData {
  total: number;
  orders: IOrder[];
}

export const getOrders = createAsyncThunk<IOrdersData, IGetOrdersParams, IThunkAPI>(
  'orders/get-all',
  async ({ limit, offset, filters }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Api.Orders.get({ limit, offset, filters });

      const hasNoOrders = data.orders.length === 0;

      if (hasNoOrders) {
        dispatch(ordersActions.setNotFound({ notFound: true }));
      }

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
    setNotFound(state: State, { payload }: PayloadAction<{ notFound: boolean }>) {
      state.notFound = payload.notFound;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state: State) => {
      state.notFound = false;
      state.isLoading = true;
      state.isError = false;
      state.total = null;
      state.items = [];
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
