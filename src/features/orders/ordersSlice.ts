import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { OrdersSchema } from '@src/common/normalizeSchemas';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { normalize } from 'normalizr';
import { IOrder, IOrderEntities } from '../purchases/types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  items: [] as number[],
};

type State = typeof initialState;

export const getOrders = createAsyncThunk<any, undefined, IThunkAPI>(
  'orders/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Orders.get();

      const { result, entities } = normalize<IOrder, IOrderEntities, number[]>(data.orders, OrdersSchema);
      console.log({ entities });
      return {
        result,
        entities,
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getOrders.fulfilled, (state: State, { payload }: PayloadAction<{ result: number[] }>) => {
      state.isLoading = false;
      state.items = payload.result;
    });
    builder.addCase(getOrders.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
