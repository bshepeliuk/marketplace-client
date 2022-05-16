import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

const getCategoriesState = (state: RootState) => state.categories;
const getCategoryEntities = (state: RootState) => state.entities.categories;

export const categoriesSelector = createSelector(
  [getCategoriesState, getCategoryEntities],
  (state, entity) => {
    const items = state.items.map((categoryId) => entity[categoryId]);

    return {
      items,
      isLoading: state.isLoading,
    };
  },
);
