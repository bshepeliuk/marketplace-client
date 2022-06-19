/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { normalize } from 'normalizr';
import { CategoriesSchema } from '@src/common/normalizeSchemas';
import { useSearchParams } from 'react-router-dom';
import CategoriesListView from '@features/categories/components/CategoriesListView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { categories } from '../../../mocks/data';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
}));

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

describe('[COMPONENTS]: CategoriesListView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => <CategoriesListView />,
    });

    for (const category of categories) {
      const Category = getByText(category.name);
      expect(Category).toBeInTheDocument();
    }
  });

  test('should change search params on category click', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => <CategoriesListView />,
    });

    const [category] = categories;

    const Category = getByText(category.name);

    fireEvent.click(Category);

    expect(mockedNavigate).toBeCalledWith({
      pathname: '/',
      search: '?categoryId=1',
    });
  });

  test('should not change search params when current and prev categoryId are the same', () => {
    const [category] = categories;

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(`?categoryId=${category.id}`),
      jest.fn(),
    ]);

    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => <CategoriesListView />,
    });

    const Category = getByText(category.name);

    fireEvent.click(Category);

    expect(mockedNavigate).not.toBeCalled();
  });
});
