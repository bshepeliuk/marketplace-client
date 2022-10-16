import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useFetchPurchases from '@src/features/purchases/hooks/useFetchPurchases';
import { getPurchases } from '@src/features/purchases/purchasesSlice';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/purchases/purchasesSlice', () => ({
  ...jest.requireActual('@src/features/purchases/purchasesSlice'),
  __esModule: true,
  getPurchases: jest.fn(),
}));

describe('[HOOK]: useFetchPurchases', () => {
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
    const { result } = renderHook(() => useFetchPurchases(), { wrapper: Wrapper });

    expect(typeof result.current.fetchPurchases).toBe('function');
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.total).toBeNull();
    expect(result.current.items).toHaveLength(0);
  });

  test('in case fetchOrders method was called, should dispatch getOrders thunk.', async () => {
    const { result } = renderHook(() => useFetchPurchases(), { wrapper: Wrapper });

    act(() => {
      result.current.fetchPurchases({ limit: ORDERS_LIMIT, offset: 0 });
    });

    expect(getPurchases).toBeCalledWith({ filters: undefined, limit: ORDERS_LIMIT, offset: 0 });
  });
});
