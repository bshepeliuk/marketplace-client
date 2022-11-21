import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';

interface ITransferItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
  arrival_date: number;
}

type ITransfers = ITransferItem[];

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  hasMore: true,
  items: [] as ITransfers,
};

type State = typeof initialState;

interface ITransfersData {
  transfers: ITransfers;
  hasMore: boolean;
}

export const getTransfers = createAsyncThunk<ITransfersData, undefined, IThunkAPI>(
  'transfers/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Transfers.get();

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
      state.isLoading = false;
      state.items = payload.transfers;
      state.hasMore = payload.hasMore;
    });
    builder.addCase(getTransfers.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice.reducer;
