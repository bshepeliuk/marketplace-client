import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IMoneyMovementParams } from '@src/common/types/apiTypes';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';

interface ITransferItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
  arrival_date: number;
  automatic: boolean;
  type: string;
}

type ITransfers = ITransferItem[];

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  hasMore: true,
  firstItemId: undefined as string | undefined,
  endChunkId: undefined as string | undefined,
  startChunkId: undefined as string | undefined,
  items: [] as ITransfers,
};

type State = typeof initialState;

interface ITransfersData {
  transfers: ITransfers;
  hasMore: boolean;
}

export const getTransfers = createAsyncThunk<ITransfersData, IMoneyMovementParams, IThunkAPI>(
  'transfers/get',
  async ({ startChunkId, endChunkId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Transfers.get({ startChunkId, endChunkId, limit });

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransfers.pending, (state: State) => {
      state.isLoading = true;
      state.hasMore = true;
      state.isError = false;
    });
    builder.addCase(getTransfers.fulfilled, (state: State, { payload }: PayloadAction<ITransfersData>) => {
      const FIRST_IDX = 0;
      const LAST_IDX = payload.transfers.length - 1;

      if (state.items.length === 0) {
        state.firstItemId = payload.transfers[0].id;
      }

      state.isLoading = false;
      state.items = payload.transfers;
      state.hasMore = payload.hasMore;
      state.startChunkId = payload.transfers[FIRST_IDX].id;
      state.endChunkId = payload.transfers[LAST_IDX].id;
    });
    builder.addCase(getTransfers.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice.reducer;
