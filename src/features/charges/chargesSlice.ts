import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IGetChargesParams } from '@src/common/types/apiTypes';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';

interface IChargeItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
}

type ICharges = IChargeItem[];

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  hasMore: true,
  firstItemId: undefined as string | undefined,
  endChunkId: undefined as string | undefined,
  startChunkId: undefined as string | undefined,
  items: [] as ICharges,
};

type State = typeof initialState;

interface IChargesData {
  charges: ICharges;
  hasMore: boolean;
}

export const getCharges = createAsyncThunk<IChargesData, IGetChargesParams, IThunkAPI>(
  'charges/get',
  async ({ startChunkId, endChunkId, limit }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Charges.get({ startChunkId, endChunkId, limit });

      return {
        charges: data.charges.data,
        hasMore: data.charges.has_more,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const chargesSlice = createSlice({
  initialState,
  name: 'charges',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharges.pending, (state: State) => {
      state.isLoading = true;
      state.hasMore = true;
      state.isError = false;
    });
    builder.addCase(getCharges.fulfilled, (state: State, { payload }: PayloadAction<IChargesData>) => {
      if (state.items.length === 0) {
        state.firstItemId = payload.charges[0].id;
      }

      state.isLoading = false;
      state.items = payload.charges;
      state.hasMore = payload.hasMore;
      state.startChunkId = payload.charges[0].id;
      state.endChunkId = payload.charges[payload.charges.length - 1].id;
    });
    builder.addCase(getCharges.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const chargesActions = chargesSlice.actions;
export default chargesSlice.reducer;
