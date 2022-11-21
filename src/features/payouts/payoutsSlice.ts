import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';

interface IPayoutItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
  arrival_date: number;
}

type IPayouts = IPayoutItem[];

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  hasMore: true,
  items: [] as IPayouts,
};

type State = typeof initialState;

interface IPayoutsData {
  payouts: IPayouts;
  hasMore: boolean;
}

export const getPayouts = createAsyncThunk<IPayoutsData, undefined, IThunkAPI>(
  'payouts/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Payouts.get();

      return {
        payouts: data.payouts.data,
        hasMore: data.payouts.has_more,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const payoutsSlice = createSlice({
  initialState,
  name: 'payouts',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayouts.pending, (state: State) => {
      state.isLoading = true;
      state.hasMore = true;
      state.isError = false;
    });
    builder.addCase(getPayouts.fulfilled, (state: State, { payload }: PayloadAction<IPayoutsData>) => {
      state.isLoading = false;
      state.items = payload.payouts;
      state.hasMore = payload.hasMore;
    });
    builder.addCase(getPayouts.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const payoutsActions = payoutsSlice.actions;
export default payoutsSlice.reducer;
