import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IBrand, IBrandsData } from './types';

export const initialState = {
  isError: false,
  isLoading: false,
  items: [] as IBrand[],
};

type State = typeof initialState;

type GetBrandsPayload = PayloadAction<IBrandsData>;

export const getBrands = createAsyncThunk<IBrandsData, undefined, IThunkAPI>(
  'brands/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Brands.get();

      return {
        brands: data.brands,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

const brandsSlice = createSlice({
  initialState,
  name: 'brands',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getBrands.fulfilled,
      (state: State, { payload }: GetBrandsPayload) => {
        state.isLoading = false;
        state.items = payload.brands;
      },
    );
    builder.addCase(getBrands.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const brandsActions = brandsSlice.actions;
export default brandsSlice.reducer;
