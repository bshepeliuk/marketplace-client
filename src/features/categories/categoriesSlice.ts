import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import * as Api from '@src/common/api/Api';
import { CategoriesSchema, CategorySchema } from '@src/common/normalizeSchemas';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import {
  CategoryEntities,
  ICategoriesData,
  ICategory,
  ICategoryData,
} from './types';

export const initialState = {
  isError: false,
  isLoading: false,
  items: [] as number[],
  isCreating: false,
  isCreatingError: false,
};

type State = typeof initialState;

export const getCategories = createAsyncThunk<
  ICategoriesData,
  undefined,
  IThunkAPI
>(
  'categories/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Categories.get({ name: undefined });

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

export const addCategory = createAsyncThunk<
  ICategoryData,
  { name: string },
  IThunkAPI
>('brands/create', async ({ name }, { rejectWithValue }) => {
  try {
    const { data } = await Api.Categories.create({ name });

    const { result, entities } = normalize<ICategory, CategoryEntities, number>(
      data.type,
      CategorySchema,
    );

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
});

const categoriesSlice = createSlice({
  initialState,
  name: 'categories',
  reducers: {},
  extraReducers: (builder) => {
    // get categories
    builder.addCase(getCategories.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state: State, { payload }: PayloadAction<{ result: number[] }>) => {
        state.isLoading = false;
        state.items = payload.result;
      },
    );
    builder.addCase(getCategories.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
    // create a new category
    builder.addCase(addCategory.pending, (state: State) => {
      state.isCreating = true;
      state.isCreatingError = false;
    });
    builder.addCase(
      addCategory.fulfilled,
      (state: State, { payload }: PayloadAction<{ result: number }>) => {
        state.isCreating = false;
        state.items.unshift(payload.result);
      },
    );
    builder.addCase(addCategory.rejected, (state: State) => {
      state.isCreating = false;
      state.isCreatingError = true;
    });
  },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
