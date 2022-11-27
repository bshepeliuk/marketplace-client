import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { MoneyMovementParams } from '@src/common/types/apiTypes';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { ICharges } from './types';

type IdType = string | number | null;

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  hasMore: true,
  startingAfter: null as IdType,
  endingBefore: null as IdType,
  firstItemId: null as IdType,
  lastItemId: null as IdType,
  items: [] as ICharges,
};

type State = typeof initialState;

interface IChargesData {
  charges: ICharges;
  hasMore: boolean;
}

export const getCharges = createAsyncThunk<IChargesData, MoneyMovementParams, IThunkAPI>(
  'charges/get',
  async ({ endingBefore, startingAfter, limit }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Charges.get({ endingBefore, startingAfter, limit });

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
  reducers: {
    changeBoundIds(state: State, { payload }: PayloadAction<{ startingAfter: IdType; endingBefore: IdType }>) {
      state.startingAfter = payload.startingAfter;
      state.endingBefore = payload.endingBefore;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharges.pending, (state: State) => {
      state.isLoading = true;
      state.hasMore = true;
      state.isError = false;
    });
    builder.addCase(getCharges.fulfilled, (state: State, { payload }: PayloadAction<IChargesData>) => {
      const FIRST_IDX = 0;
      const LAST_IDX = payload.charges.length - 1;
      const LAST_ITEM_ID = payload.charges[LAST_IDX].id;
      const FIRST_ITEM_ID = payload.charges[FIRST_IDX].id;

      const hasNoItems = state.items.length === 0;
      const hasNoMore = !payload.hasMore;

      if (hasNoItems) state.firstItemId = FIRST_ITEM_ID;
      if (hasNoMore) state.lastItemId = LAST_ITEM_ID;

      state.endingBefore = FIRST_ITEM_ID;
      state.startingAfter = LAST_ITEM_ID;
      state.isLoading = false;
      state.hasMore = payload.hasMore;
      state.items.push(...payload.charges);
    });
    builder.addCase(getCharges.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const chargesActions = chargesSlice.actions;
export default chargesSlice.reducer;
