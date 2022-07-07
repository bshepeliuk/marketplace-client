import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import SearchProvider, {
  SearchContext,
} from '@src/features/search/context/SearchContext';
import { routes } from '@src/app/Router';
import { Wrapper } from '../../../wrapper';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  __esModule: true,
  useSearchParams: jest
    .fn()
    .mockImplementation(() => [new URLSearchParams(), jest.fn()]),
  useNavigate: () => mockNavigate,
}));

const server = setupServer();

describe('[CONTEXT]: SearchProvider', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

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

  it('should have initial falsy values: isVisible, isEmpty, isLoading.', () => {
    const { getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            return (
              <div>
                <span>isVisible: {String(value.isVisible)}</span>
                <span>isEmpty: {String(value.isEmpty)}</span>
                <span>isLoading: {String(value.isLoading)}</span>
              </div>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/isVisible: false/i)).toBeTruthy();
    expect(getByText(/isEmpty: false/i)).toBeTruthy();
    expect(getByText(/isLoading: false/i)).toBeTruthy();
  });

  it('should change initial value.', async () => {
    const { getByLabelText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return;

            return (
              <label htmlFor="search">
                Search
                <input
                  id="search"
                  type="text"
                  value={value.searchValue}
                  onChange={value.onChange}
                />
              </label>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    expect(searchInput.value).toBe('');

    const value = 'ASUS Zenbook 17';

    fireEvent.change(searchInput, { target: { value } });

    expect(searchInput.value).toBe(value);
  });

  it('should clear typed value.', async () => {
    const { getByLabelText, getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return;

            return (
              <>
                <label htmlFor="search">
                  Search
                  <input
                    id="search"
                    type="text"
                    value={value.searchValue}
                    onChange={value.onChange}
                  />
                </label>
                <button type="button" onClick={value.onClear}>
                  clear
                </button>
              </>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    expect(searchInput.value).toBe('');

    const value = 'ASUS Zenbook 17';

    fireEvent.change(searchInput, { target: { value } });

    expect(searchInput.value).toBe(value);

    fireEvent.click(getByText(/clear/i));

    expect(searchInput.value).toBe('');
  });
  // eslint-disable-next-line max-len
  it('should show suggestion list on typing and hide it when value was removed.', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return;

            return (
              <>
                <label htmlFor="search">
                  Search
                  <input
                    id="search"
                    type="text"
                    value={value.searchValue}
                    onChange={value.onChange}
                  />
                </label>

                {value.isVisible && (
                  <span>Some suggestions list should be here.</span>
                )}
              </>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    expect(searchInput.value).toBe('');

    const value = 'ASUS Zenbook 17';

    fireEvent.change(searchInput, { target: { value } });

    expect(searchInput.value).toBe(value);
    expect(
      getByText(/Some suggestions list should be here./i),
    ).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(queryByText(/Some suggestions list should be here./i)).toBeNull();
  });

  it('should navigate to search result page', async () => {
    const { getByLabelText, getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return;

            return (
              <>
                <label htmlFor="search">
                  Search
                  <input
                    id="search"
                    type="text"
                    value={value.searchValue}
                    onChange={value.onChange}
                  />
                </label>
                <button type="button" onClick={value.onSearch}>
                  search devices
                </button>
              </>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    expect(searchInput.value).toBe('');

    const value = 'ASUS Zenbook 17';

    fireEvent.change(searchInput, { target: { value } });

    expect(searchInput.value).toBe(value);

    fireEvent.click(getByText(/search devices/i));

    expect(mockNavigate).toBeCalledWith(`${routes.searchResult}?name=${value}`);
  });

  it('should not navigate to search result page when value is empty.', async () => {
    const { getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return;

            return (
              <button type="button" onClick={value.onSearch}>
                search devices
              </button>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText(/search devices/i));

    expect(mockNavigate).not.toBeCalled();
  });

  it('should render suggestions.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(
          ctx.json({
            devices: [device],
          }),
        );
      }),
    );

    const { getByLabelText, getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            return (
              <>
                <label htmlFor="search">
                  Search
                  <input
                    id="search"
                    type="text"
                    value={value.searchValue}
                    onChange={value.onChange}
                  />
                </label>

                <ul>
                  {value.suggestions.map((item) => {
                    return <li key={item.id}>suggestion - {item.name}</li>;
                  })}
                </ul>
              </>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: device.name } });

    await waitFor(
      () => {
        expect(getByText(`suggestion - ${device.name}`)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
  // eslint-disable-next-line max-len
  it('should show "not found" message when something went wrong', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Something went wrong!',
          }),
        );
      }),
    );

    const { getByLabelText, getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            return (
              <>
                <label htmlFor="search">
                  Search
                  <input
                    id="search"
                    type="text"
                    value={value.searchValue}
                    onChange={value.onChange}
                  />
                </label>

                {value.isEmpty && <span>Not found.</span>}
              </>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: device.name } });

    await waitFor(
      () => {
        expect(getByText(/not found/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('should show "not found" message when suggestions array is empty.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            devices: [],
          }),
        );
      }),
    );

    const { getByLabelText, getByText } = render(
      <SearchProvider>
        <SearchContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            return (
              <>
                <label htmlFor="search">
                  Search
                  <input
                    id="search"
                    type="text"
                    value={value.searchValue}
                    onChange={value.onChange}
                  />
                </label>

                {value.isEmpty && (
                  <span>
                    Unfortunately we don't have devices with such name.
                  </span>
                )}
              </>
            );
          }}
        </SearchContext.Consumer>
      </SearchProvider>,
      { wrapper: Wrapper },
    );

    const searchInput = getByLabelText(/search/i) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: device.name } });

    await waitFor(
      () => {
        expect(
          getByText(/Unfortunately we don't have devices with such name./i),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
