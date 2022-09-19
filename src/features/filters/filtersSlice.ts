import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IDeviceInfo } from '../devices/types';

export interface IMinMaxPrice {
  min: number;
  max: number;
}

interface IFilterData {
  options: IDeviceInfo[];
  prices: IMinMaxPrice;
}

interface IFilterOptionsParams {
  categoryId: number;
}

export const initialState = {
  options: {
    isError: false,
    isLoading: false,
    items: [] as IDeviceInfo[],
    prices: {} as IMinMaxPrice,
  },
};

type State = typeof initialState;

export const getFilterOptionsByCategoryId = createAsyncThunk<IFilterData, IFilterOptionsParams, IThunkAPI>(
  'filters/get-options',
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Filters.getByCategoryId(categoryId);

      return {
        options: data.options,
        prices: data.prices,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().filters.options;

      if (isLoading) return false;
    },
  },
);

const filtersSlice = createSlice({
  initialState,
  name: 'filters',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilterOptionsByCategoryId.pending, (state: State) => {
      state.options.isLoading = true;
      state.options.isError = false;
    });
    builder.addCase(getFilterOptionsByCategoryId.fulfilled, (state: State, { payload }: PayloadAction<IFilterData>) => {
      state.options.isLoading = false;
      state.options.prices = payload.prices;
      state.options.items = payload.options;
    });
    builder.addCase(getFilterOptionsByCategoryId.rejected, (state: State) => {
      state.options.isLoading = false;
      state.options.isError = true;
    });
  },
});

export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;
