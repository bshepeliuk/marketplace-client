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

  test('should render all categories from list.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: () => <CategoriesListView />,
    });

    for (const category of categories) {
      const Category = getByText(category.name);
      expect(Category).toBeInTheDocument();
    }
  });

  test('should render loader when isLoading equals to true.', () => {
    const { getAllByText } = setupAndRenderComponent({
      state: {
        ...rootStateMock,
        categories: {
          ...rootStateMock.categories,
          isLoading: true,
        },
      },
      component: () => <CategoriesListView />,
    });

    expect(getAllByText(/Loading.../i).length).toBeGreaterThan(1);
  });
});
