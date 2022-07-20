/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { generatePath } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { SearchContext } from '@src/features/search/context/SearchContext';
import SuggestionList from '@src/features/search/components/SearchBar/SuggestionList';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

const device = {
  id: 1,
  name: 'HP Pavillion 15 eh1021-ua',
  price: 33448,
  brandId: 2,
  typeId: 1,
  userId: 1,
  quantity: 1,
  images: [],
  info: [],
  count: 1,
  createdAt: '2022-01-05T16:57:37.787Z',
  updatedAt: '2022-01-05T16:57:37.787Z',
};

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

describe('[COMPONENTS]: SuggestionList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render suggestion list.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => (
        <SearchContext.Provider
          value={{
            ...searchContextMock,
            isVisible: true,
            suggestions: [device],
          }}
        >
          <SearchContext.Consumer>
            {() => <SuggestionList />}
          </SearchContext.Consumer>
        </SearchContext.Provider>
      ),
    });

    expect(getByText(device.name)).toBeInTheDocument();
  });

  test('click over suggestion item. should navigate to device page and clear input.', () => {
    const onClearMock = jest.fn();

    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => (
        <SearchContext.Provider
          value={{
            ...searchContextMock,
            isVisible: true,
            isLoading: true,
            onClear: onClearMock,
            suggestions: [device],
          }}
        >
          <SearchContext.Consumer>
            {() => <SuggestionList />}
          </SearchContext.Consumer>
        </SearchContext.Provider>
      ),
    });

    const listItem = getByText(device.name);

    expect(listItem).toBeInTheDocument();

    fireEvent.click(listItem);

    expect(onClearMock).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith(
      generatePath(routes.device, { deviceId: String(device.id) }),
    );
  });
});
