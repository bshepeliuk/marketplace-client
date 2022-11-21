import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IThunkAPI, Nullable } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IBalance } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  current: null as Nullable<IBalance>,
};

type State = typeof initialState;

interface IBalanceData {
  balance: IBalance;
}

export const getBalance = createAsyncThunk<IBalanceData, undefined, IThunkAPI>(
  'seller/balance',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Balance.get();

      return {
        balance: data.balance,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const balanceSlice = createSlice({
  initialState,
  name: 'balance',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getBalance.fulfilled, (state: State, { payload }: PayloadAction<IBalanceData>) => {
      state.isLoading = false;
      state.current = payload.balance;
    });
    builder.addCase(getBalance.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const balanceActions = balanceSlice.actions;
export default balanceSlice.reducer;
