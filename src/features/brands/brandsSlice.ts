import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IBrand, IBrandsData } from './types';

export const initialState = {
  isError: false,
  isLoading: false,
  items: [] as IBrand[],
  isCreating: false,
  isCreatingError: false,
};

type State = typeof initialState;

type GetBrandsPayload = PayloadAction<IBrandsData>;

export const getBrands = createAsyncThunk<
  IBrandsData,
  { name?: string },
  IThunkAPI
>('brands/get-all', async ({ name }, { rejectWithValue }) => {
  try {
    const filters = {
      name,
    };

    const { data } = await Api.Brands.get(filters);

    return {
      brands: data.brands,
    };
  } catch (error) {
    const message = getErrorMessage(error);

    return rejectWithValue({
      message,
    });
  }
});

export const addBrand = createAsyncThunk<
  { brand: IBrand },
  { name: string },
  IThunkAPI
>('brands/create', async ({ name }, { rejectWithValue }) => {
  try {
    const { data } = await Api.Brands.create({ name });

    return {
      brand: data.brand,
    };
  } catch (error) {
    const message = getErrorMessage(error);

    return rejectWithValue({
      message,
    });
  }
});

const brandsSlice = createSlice({
  initialState,
  name: 'brands',
  reducers: {
    add(state: State, { payload }: PayloadAction<{ brand: IBrand }>) {
      state.items.push(payload.brand);
    },
  },
  extraReducers: (builder) => {
    // get brands
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
    // create brand
    builder.addCase(addBrand.pending, (state: State) => {
      state.isCreating = true;
      state.isCreatingError = false;
    });
    builder.addCase(
      addBrand.fulfilled,
      (state: State, { payload }: PayloadAction<{ brand: IBrand }>) => {
        state.isCreating = false;
        state.items.unshift(payload.brand);
      },
    );
    builder.addCase(addBrand.rejected, (state: State) => {
      state.isCreating = false;
      state.isCreatingError = true;
    });
  },
});

export const brandsActions = brandsSlice.actions;
export default brandsSlice.reducer;
