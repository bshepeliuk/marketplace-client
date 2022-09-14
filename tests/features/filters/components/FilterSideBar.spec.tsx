/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { waitFor } from '@testing-library/react';

import FilterSideBarView from '@features/filters/components/FilterSideBar';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { mockOptions } from '../../../mocks/data';

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
      prices: {
        min: 1222,
        max: 5444,
      },
      items: mockOptions,
    },
  },
};

describe('[COMPONENTS]: FilterSideBarView', () => {
  test('should min and max input with values from state.', async () => {
    const {
      options: { prices },
    } = rootState.filters;

    const { container } = setupAndRenderComponent({
      state: rootState,
      component: () => <FilterSideBarView />,
    });

    await waitFor(
      () => {
        const MaxInput = container.querySelector(`input[name="max"]`) as HTMLInputElement;

        const MinInput = container.querySelector(`input[name="min"]`) as HTMLInputElement;

        expect(+MinInput.value).toEqual(prices.min);
        expect(+MaxInput.value).toEqual(prices.max);
      },
      { timeout: 500 },
    );
  });
});
