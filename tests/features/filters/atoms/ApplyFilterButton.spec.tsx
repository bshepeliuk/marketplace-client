/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import ApplyFilterButton from '@features/filters/atoms/ApplyFilterButton';
import { BASE_API_URL } from '@src/common/constants';

import {
  FilterContext,
  FilterProvider,
} from '@features/filters/context/FilterContext';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { filterContextValuesMock } from '../../../mocks/data';

const server = setupServer();

const rootState = {
  entities: {},
  auth: {
    isLoggedIn: true,
  },
  categories: {
    items: [],
    isError: false,
    isLoading: false,
  },
  filters: {
    options: {
      prices: {},
      items: [],
    },
  },
};

describe('[ATOMS]: ApplyFilterButton', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render apply button with Loader by default.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => (
        <FilterProvider>
          <ApplyFilterButton />
        </FilterProvider>
      ),
    });

    expect(getByText(/show/i)).toBeInTheDocument();
  });

  test('should render apply button with counter.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ devices: Array(18) }));
      }),
    );

    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => (
        <FilterContext.Provider
          value={{
            ...filterContextValuesMock,
            prices: [1000, 2000],
            hasSelectedItems: true,
            selected: Array(6),
          }}
        >
          <ApplyFilterButton />
        </FilterContext.Provider>
      ),
    });

    await waitFor(
      () => {
        expect(getByText(/show - 18/i)).toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  test('should return counter with 0 value when something went wrong.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Something went wrong!' }),
        );
      }),
    );

    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => (
        <FilterContext.Provider
          value={{
            ...filterContextValuesMock,
            prices: [1000, 2000],
            hasSelectedItems: true,
            selected: Array(6),
          }}
        >
          <ApplyFilterButton />
        </FilterContext.Provider>
      ),
    });

    await waitFor(
      () => {
        expect(getByText(/show - 0/i)).toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });
});
