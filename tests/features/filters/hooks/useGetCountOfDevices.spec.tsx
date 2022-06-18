/* eslint-disable max-len */
import React from 'react';
import useGetCountOfDevices from '@src/features/filters/hooks/useGetCountOfDevices';
import * as ReactRedux from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  FilterContext,
  FilterProvider,
} from '@src/features/filters/context/FilterContext';
import store from '@src/app/store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import { paramsEntries } from '../../../mocks/data';

const server = setupServer();

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const filterContextValuesMock = {
  btnOffsetY: 0,
  setBtnOffsetY: jest.fn(),
  selected: Array(2),
  setSelected: jest.fn(),
  onSelectOption: jest.fn(),
  clearSelectedOptions: jest.fn(),
  isShownApplyBtn: false,
  setIsShownApplyBtn: jest.fn(),
  hasSelectedItems: true,
  setPrices: jest.fn(),
  apply: jest.fn(),
  prices: [1, 200],
  shouldBeInitial: false,
  isInitPrice: false,
  getFilterParams: jest.fn(),
  setShouldBeInitial: jest.fn(),
};

describe('[HOOK]: useGetCountOfDevices', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  beforeEach(() => {
    useDispatchMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('initial rendering', () => {
    const { result } = renderHook(() => useGetCountOfDevices(), {
      wrapper: (props: any) => (
        <Provider store={store}>
          <MemoryRouter>
            <FilterProvider>{props.children}</FilterProvider>
          </MemoryRouter>
        </Provider>
      ),
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isLoading).toBeTruthy();
    expect(typeof result.current.getCountByParams).toBe('function');
  });

  test('should return count of devices.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(ctx.json({ devices: Array(8) }));
      }),
    );

    const { result, waitForNextUpdate } = renderHook(useGetCountOfDevices, {
      wrapper: (props: any) => (
        <Provider store={store}>
          <MemoryRouter>
            <FilterProvider>{props.children}</FilterProvider>
          </MemoryRouter>
        </Provider>
      ),
    });

    act(() => {
      result.current.getCountByParams(paramsEntries);
    });

    await waitForNextUpdate();

    expect(result.current.count).toBe(8);
    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
  });

  test('should change counter to default value when something went wrong.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: '[API]: Something went wrong!' }),
        );
      }),
    );

    const { result, waitForNextUpdate } = renderHook(useGetCountOfDevices, {
      wrapper: (props: any) => (
        <Provider store={store}>
          <MemoryRouter>
            <FilterProvider>{props.children}</FilterProvider>
          </MemoryRouter>
        </Provider>
      ),
    });

    act(() => {
      result.current.getCountByParams(paramsEntries);
    });

    await waitForNextUpdate();

    expect(result.current.count).toBe(0);
    expect(result.current.isLoading).toBeFalsy();
  });

  test('should set counter when prices or selected items have been changed.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
        return res(ctx.json({ devices: Array(4) }));
      }),
    );

    const { result, waitForNextUpdate } = renderHook(useGetCountOfDevices, {
      wrapper: (props: any) => (
        <Provider store={store}>
          <MemoryRouter>
            <FilterContext.Provider value={filterContextValuesMock}>
              {props.children}
            </FilterContext.Provider>
          </MemoryRouter>
        </Provider>
      ),
    });

    await waitForNextUpdate({ timeout: 1500 });

    expect(result.current.count).toBe(4);
    expect(result.current.isLoading).toBeTruthy();
  });
});
