/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { SearchContext } from '@src/features/search/context/SearchContext';
import SuggestionsView from '@features/search/components/SearchBar/SuggestionsView';
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

describe('[PAGES]: SuggestionView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render loader during fetching process.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => (
        <SearchContext.Provider
          value={{
            ...searchContextMock,
            isVisible: true,
            isLoading: true,
            suggestions: [device],
          }}
        >
          <SearchContext.Consumer>
            {() => <SuggestionsView />}
          </SearchContext.Consumer>
        </SearchContext.Provider>
      ),
    });

    expect(getByText(/loading.../i)).toBeInTheDocument();
  });

  test('should render not found message when suggestion array is empty.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => (
        <SearchContext.Provider
          value={{
            ...searchContextMock,
            isVisible: true,
            isLoading: false,
            isEmpty: true,
          }}
        >
          <SearchContext.Consumer>
            {() => <SuggestionsView />}
          </SearchContext.Consumer>
        </SearchContext.Provider>
      ),
    });

    expect(
      getByText(/Unfortunately we don't have devices with such name./i),
    ).toBeInTheDocument();
  });

  test('should render suggestion list', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => (
        <SearchContext.Provider
          value={{
            ...searchContextMock,
            isVisible: true,
            isLoading: false,
            suggestions: [device],
          }}
        >
          <SearchContext.Consumer>
            {() => <SuggestionsView />}
          </SearchContext.Consumer>
        </SearchContext.Provider>
      ),
    });

    expect(getByText(device.name, { exact: false })).toBeInTheDocument();
  });
});
