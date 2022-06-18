/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { FilterContext } from '@features/filters/context/FilterContext';
import ClearFilterButton from '@features/filters/atoms/ClearFilterButton';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { filterContextValuesMock } from '../../../mocks/data';

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

describe('[ATOMS]: ClearFilterButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call clearSelectedOptions from context by click.', () => {
    const onClear = jest.fn();

    const { container } = setupAndRenderComponent({
      state: rootState,
      component: () => (
        <FilterContext.Provider
          value={{ ...filterContextValuesMock, clearSelectedOptions: onClear }}
        >
          <ClearFilterButton />
        </FilterContext.Provider>
      ),
    });

    const clearBtn = container.querySelector('button');

    fireEvent.click(clearBtn as HTMLButtonElement);

    expect(clearBtn).toBeInTheDocument();
    expect(onClear).toBeCalledTimes(1);
  });
});
