import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useFetchOrders from '@src/features/orders/hooks/useFetchOrders';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import { getOrders } from '@src/features/orders/ordersSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/orders/ordersSlice', () => ({
  ...jest.requireActual('@src/features/orders/ordersSlice'),
  __esModule: true,
  getOrders: jest.fn(),
}));

describe('[HOOK]: useFetchOrders', () => {
  const dispatch = jest.fn();

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have initial values.', () => {
    const { result } = renderHook(() => useFetchOrders(), { wrapper: Wrapper });

    expect(typeof result.current.fetchOrders).toBe('function');
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.total).toBeNull();
    expect(result.current.items).toHaveLength(0);
  });

  test('in case fetchOrders method was called, should dispatch getOrders thunk.', async () => {
    const { result } = renderHook(() => useFetchOrders(), { wrapper: Wrapper });

    act(() => {
      result.current.fetchOrders({ limit: ORDERS_LIMIT, offset: 0 });
    });

    expect(getOrders).toBeCalledWith({ filters: undefined, limit: 20, offset: 0 });
  });
});
