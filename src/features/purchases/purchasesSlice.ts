import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { PurchasesSchema } from '@src/common/normalizeSchemas';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { normalize } from 'normalizr';
import { IPurchase, IPurchaseData, IPurchaseEntities } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  items: [] as number[],
};

type State = typeof initialState;

export const getPurchases = createAsyncThunk<IPurchaseData, undefined, IThunkAPI>(
  'purchases/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Purchases.get();

      const { result, entities } = normalize<IPurchase, IPurchaseEntities, number[]>(data.purchases, PurchasesSchema);

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

const purchasesSlice = createSlice({
  initialState,
  name: 'purchases',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPurchases.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getPurchases.fulfilled, (state: State, { payload }: PayloadAction<{ result: number[] }>) => {
      state.isLoading = false;
      state.items = payload.result;
    });
    builder.addCase(getPurchases.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const purchasesActions = purchasesSlice.actions;
export default purchasesSlice.reducer;
