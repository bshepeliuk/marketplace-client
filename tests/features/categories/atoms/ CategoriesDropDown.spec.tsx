/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { normalize } from 'normalizr';
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { CategoriesSchema } from '@src/common/normalizeSchemas';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { categories } from '../../../mocks/data';

const { result, entities } = normalize(categories, CategoriesSchema);

const rootState = {
  entities,
  auth: {
    isLoggedIn: true,
  },
  categories: {
    items: result,
    isError: false,
    isLoading: false,
  },
};

describe('[COMPONENTS]: CategoriesDropDown', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => <CategoriesDropDown />,
    });

    const CategoriesBtn = getByText(/categories/i);

    fireEvent.click(CategoriesBtn);

    for (const category of categories) {
      const CategoryLink = getByText(category.name);

      expect(CategoryLink.getAttribute('href')).toBe(
        `/devices?categoryId=${category.id}`,
      );
      expect(CategoryLink).toBeInTheDocument();
    }
  });
});
