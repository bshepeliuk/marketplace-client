import React from 'react';
import { fireEvent } from '@testing-library/react';
import { SearchContext } from '@src/features/search/context/SearchContext';
import DeleteButton from '@features/search/components/SearchBar/DeleteButton';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const searchContextMock = {
  searchValue: '',
  isEmpty: false,
  isLoading: false,
  isVisible: false,
  suggestions: [],
  onChange: jest.fn(),
  onClear: jest.fn(),
  onSearch: jest.fn(),
};

describe('[COMPONENTS]: DeleteButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should clear search input on click.', () => {
    const onClearMock = jest.fn();

    const { getByTestId } = setupAndRenderComponent({
      state: {},
      component: () => (
        <SearchContext.Provider
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          value={{
            ...searchContextMock,
            isVisible: true,
            onClear: onClearMock,
            suggestions: [],
          }}
        >
          <SearchContext.Consumer>
            {() => <DeleteButton />}
          </SearchContext.Consumer>
        </SearchContext.Provider>
      ),
    });

    const deleteBtn = getByTestId('clear-search');

    fireEvent.click(deleteBtn);

    expect(onClearMock).toBeCalledTimes(1);
  });
});
