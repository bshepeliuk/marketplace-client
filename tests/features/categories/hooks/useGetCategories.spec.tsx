/* eslint-disable max-len */
import React from 'react';
import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { normalize } from 'normalizr';
import useGetCategories from '@features/categories/hooks/useGetCategories';
import { BASE_API_URL } from '@common/constants';
import { CategoriesSchema } from '@common/normalizeSchemas';
import { getCategories } from '@features/categories/categoriesSlice';
import { Wrapper } from '../../../wrapper';
import { categories } from '../../../mocks/data';

jest.mock('@features/categories/categoriesSlice', () => ({
  ...jest.requireActual('@features/categories/categoriesSlice'),
  __esModule: true,
  getCategories: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const server = setupServer(
  rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ categories: [] }));
  }),
);

describe('[HOOK]: useGetCategories.', () => {
  const dispatch = jest.fn();

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('should return initial values.', async () => {
    const { result } = renderHook(() => useGetCategories(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(Array.isArray(result.current.items)).toBeTruthy();
    expect(result.current.items).toHaveLength(0);
    expect(getCategories).toBeCalledTimes(1);
  });

  test('should return categories from API successfully.', () => {
    const { result: ids, entities } = normalize(categories, CategoriesSchema);

    const state = {
      entities: {
        categories: { ...entities.categories },
      },
      categories: {
        items: ids,
        isLoading: false,
        isError: false,
      },
    };

    const { result } = renderHook(() => useGetCategories(), {
      wrapper: (props) => <Wrapper {...props} state={state} />,
    });

    expect(result.current.items).toHaveLength(ids.length);
    expect(result.current.isLoading).toBeFalsy();
    expect(getCategories).toBeCalledTimes(0);
  });
});
