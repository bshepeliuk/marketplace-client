import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import * as Api from '@src/common/api/Api';
import { CategoriesSchema } from '@src/common/normalizeSchemas';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { CategoryEntities, ICategoriesData, ICategory } from './types';

export const initialState = {
  isError: false,
  isLoading: false,
  items: [] as number[],
};

type State = typeof initialState;

type GetCategoriesPayload = PayloadAction<{ result: number[] }>;

export const getCategories = createAsyncThunk<
  ICategoriesData,
  undefined,
  IThunkAPI
>(
  'categories/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Categories.get();

      const { result, entities } = normalize<
        ICategory,
        CategoryEntities,
        number[]
      >(data.types, CategoriesSchema);

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
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().categories;

      if (isLoading) return false;
    },
  },
);

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
        state.items = payload.result;
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
