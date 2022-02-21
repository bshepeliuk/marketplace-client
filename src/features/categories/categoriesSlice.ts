import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { ICategoriesData, ICategory } from './types';

const initialState = {
  isError: false,
  isLoading: false,
  items: [] as ICategory[],
};

type State = typeof initialState;

type GetCategoriesPayload = PayloadAction<ICategoriesData>;

export const getCategories = createAsyncThunk<
  ICategoriesData,
  undefined,
  IThunkAPI
>('categories/get-all', async (_, { rejectWithValue }) => {
  try {
    const { data } = await Api.Categories.get();

    return {
      categories: data.types,
    };
  } catch (error) {
    const message = getErrorMessage(error);

    return rejectWithValue({
      message,
    });
  }
});

const categoriesSlice = createSlice({
  initialState,
  name: 'categories',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state: State, { payload }: GetCategoriesPayload) => {
        state.isLoading = false;
        state.items = payload.categories;
      },
    );
    builder.addCase(getCategories.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
