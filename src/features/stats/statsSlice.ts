import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as Api from '@src/common/api/Api';
import { IThunkAPI, Nullable } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IStats } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  items: null as Nullable<IStats>,
};

type State = typeof initialState;

interface IStatsData {
  stats: IStats;
}

export const getStats = createAsyncThunk<IStatsData, undefined, IThunkAPI>(
  'stats/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Stats.get();

      return {
        stats: data.stats,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const statsSlice = createSlice({
  initialState,
  name: 'stats',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStats.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getStats.fulfilled, (state: State, { payload }: PayloadAction<IStatsData>) => {
      state.isLoading = false;
      state.items = payload.stats;
    });
    builder.addCase(getStats.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const statsActions = statsSlice.actions;
export default statsSlice.reducer;
