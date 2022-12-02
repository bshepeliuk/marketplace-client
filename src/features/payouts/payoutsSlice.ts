import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { MoneyMovementParams } from '@src/common/types/apiTypes';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IPayouts } from './types';

type IdType = string | number | null;

interface IPayoutsData {
  payouts: IPayouts;
  hasMore: boolean;
}

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  hasMore: true,
  startingAfter: null as IdType,
  endingBefore: null as IdType,
  firstItemId: null as IdType,
  lastItemId: null as IdType,
  items: [] as IPayouts,
};

type State = typeof initialState;

export const getPayouts = createAsyncThunk<IPayoutsData, MoneyMovementParams, IThunkAPI>(
  'payouts/get',
  async ({ startingAfter, endingBefore, limit }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Payouts.get({ startingAfter, endingBefore, limit });

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
  reducers: {
    changeBoundIds(state: State, { payload }: PayloadAction<{ startingAfter: IdType; endingBefore: IdType }>) {
      state.startingAfter = payload.startingAfter;
      state.endingBefore = payload.endingBefore;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPayouts.pending, (state: State) => {
      state.isLoading = true;
      state.hasMore = true;
      state.isError = false;
    });
    builder.addCase(getPayouts.fulfilled, (state: State, { payload }: PayloadAction<IPayoutsData>) => {
      const FIRST_IDX = 0;
      const LAST_IDX = payload.payouts.length - 1;
      const LAST_ITEM_ID = payload.payouts[LAST_IDX].id;
      const FIRST_ITEM_ID = payload.payouts[FIRST_IDX].id;

      const hasNoItems = state.items.length === 0;
      const hasNoMore = !payload.hasMore;

      if (hasNoItems) state.firstItemId = FIRST_ITEM_ID;
      if (hasNoMore) state.lastItemId = LAST_ITEM_ID;

      state.endingBefore = FIRST_ITEM_ID;
      state.startingAfter = LAST_ITEM_ID;
      state.isLoading = false;
      state.hasMore = payload.hasMore;
      state.items.push(...payload.payouts);
    });
    builder.addCase(getPayouts.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const payoutsActions = payoutsSlice.actions;
export default payoutsSlice.reducer;
