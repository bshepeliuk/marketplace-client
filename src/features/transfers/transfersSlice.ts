import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { MoneyMovementParams } from '@src/common/types/apiTypes';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { ITransfers } from './types';

type IdType = string | number | null;

interface ITransfersData {
  transfers: ITransfers;
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
  items: [] as ITransfers,
};

type State = typeof initialState;

export const getTransfers = createAsyncThunk<ITransfersData, MoneyMovementParams, IThunkAPI>(
  'transfers/get',
  async ({ startingAfter, endingBefore, limit }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Transfers.get({ startingAfter, endingBefore, limit });

      return {
        transfers: data.transfers.data,
        hasMore: data.transfers.has_more,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const transfersSlice = createSlice({
  initialState,
  name: 'transfers',
  reducers: {
    changeBoundIds(state: State, { payload }: PayloadAction<{ startingAfter: IdType; endingBefore: IdType }>) {
      state.startingAfter = payload.startingAfter;
      state.endingBefore = payload.endingBefore;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransfers.pending, (state: State) => {
      state.isLoading = true;
      state.hasMore = true;
      state.isError = false;
    });
    builder.addCase(getTransfers.fulfilled, (state: State, { payload }: PayloadAction<ITransfersData>) => {
      const FIRST_IDX = 0;
      const LAST_IDX = payload.transfers.length - 1;
      const LAST_ITEM_ID = payload.transfers[LAST_IDX].id;
      const FIRST_ITEM_ID = payload.transfers[FIRST_IDX].id;

      const hasNoItems = state.items.length === 0;
      const hasNoMore = !payload.hasMore;

      if (hasNoItems) state.firstItemId = FIRST_ITEM_ID;
      if (hasNoMore) state.lastItemId = LAST_ITEM_ID;

      state.endingBefore = FIRST_ITEM_ID;
      state.startingAfter = LAST_ITEM_ID;
      state.isLoading = false;
      state.hasMore = payload.hasMore;
      state.items.push(...payload.transfers);
    });
    builder.addCase(getTransfers.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice.reducer;
