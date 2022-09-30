import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI, Nullable } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IOrder } from '../orders/types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  total: null as Nullable<number>,
  items: [] as IOrder[],
};

type State = typeof initialState;

interface IPurchasesData {
  purchases: IOrder[];
  total: number;
}

export const getPurchases = createAsyncThunk<IPurchasesData, { limit: number; offset: number }, IThunkAPI>(
  'purchases/get-all',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Purchases.get({ limit, offset });

      return {
        total: data.total,
        purchases: data.purchases,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const purchasesSlice = createSlice({
  initialState,
  name: 'purchases',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPurchases.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getPurchases.fulfilled, (state: State, { payload }: PayloadAction<IPurchasesData>) => {
      state.isLoading = false;
      state.total = payload.total;
      state.items = payload.purchases;
    });
    builder.addCase(getPurchases.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const purchasesActions = purchasesSlice.actions;
export default purchasesSlice.reducer;
