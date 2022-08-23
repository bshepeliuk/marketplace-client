/* eslint-disable max-len */
import React from 'react';
import CategoriesListView from '@features/categories/components/CategoriesList/CategoriesListView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { categories } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[COMPONENTS]: CategoriesListView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: () => <CategoriesListView />,
    });

    for (const category of categories) {
      const Category = getByText(category.name);
      expect(Category).toBeInTheDocument();
    }
  });

  test('should have link for each category.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: () => <CategoriesListView />,
    });

    for (const category of categories) {
      const Category = getByText(category.name);
      expect(Category.getAttribute('href')).toBe(`/?categoryId=${category.id}`);
    }
  });

  test('should render loader when isLoading equals to true.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {
        ...rootStateMock,
        categories: {
          ...rootStateMock.categories,
          isLoading: true,
        },
      },
      component: () => <CategoriesListView />,
    });

    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });
});
