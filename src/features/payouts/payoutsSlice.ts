import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IMoneyMovementParams } from '@src/common/types/apiTypes';
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
  firstItemId: undefined as string | undefined,
  endChunkId: undefined as string | undefined,
  startChunkId: undefined as string | undefined,
  items: [] as IPayouts,
};

type State = typeof initialState;

interface IPayoutsData {
  payouts: IPayouts;
  hasMore: boolean;
}

export const getPayouts = createAsyncThunk<IPayoutsData, IMoneyMovementParams, IThunkAPI>(
  'payouts/get',
  async ({ startChunkId, endChunkId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Payouts.get({ startChunkId, endChunkId, limit });

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
      const FIRST_IDX = 0;
      const LAST_IDX = payload.payouts.length - 1;

      if (state.items.length === 0) state.firstItemId = payload.payouts[0].id;

      state.isLoading = false;
      state.items = payload.payouts;
      state.hasMore = payload.hasMore;
      state.startChunkId = payload.payouts[FIRST_IDX].id;
      state.endChunkId = payload.payouts[LAST_IDX].id;
    });
    builder.addCase(getPayouts.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const payoutsActions = payoutsSlice.actions;
export default payoutsSlice.reducer;
