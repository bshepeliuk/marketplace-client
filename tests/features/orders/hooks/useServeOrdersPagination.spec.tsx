import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useServeOrdersPagination from '@src/features/orders/hooks/useServeOrdersPagination';
import { FIRST_ORDER_PAGINATION_PAGE, ORDERS_LIMIT } from '@src/features/orders/constants';
import { getOrders } from '@src/features/orders/ordersSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';
import { rootStateMock } from '../../../mocks/stateMock';

global.scrollTo = jest.fn();

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/orders/ordersSlice', () => ({
  ...jest.requireActual('@src/features/orders/ordersSlice'),
  __esModule: true,
  getOrders: jest.fn(),
}));

describe('[HOOK]: useServeOrdersPagination', () => {
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
    const { result } = renderHook(() => useServeOrdersPagination(), { wrapper: Wrapper });

    expect(typeof result.current.onPageChange).toBe('function');
    expect(typeof result.current.currentPage).toBe('number');
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.total).toBeNull();
    expect(result.current.items).toHaveLength(0);
    expect(result.current.shouldHavePagination).toBeFalsy();
  });

  test('should fetch orders on mount.', () => {
    renderHook(() => useServeOrdersPagination(), { wrapper: Wrapper });

    expect(getOrders).toBeCalledWith({ filters: [], limit: ORDERS_LIMIT, offset: 0 });
  });

  test('in case amount of orders greater than ORDERS_LIMIT (20), should have pagination.', () => {
    const { result } = renderHook(() => useServeOrdersPagination(), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper
          {...props}
          state={{
            ...rootStateMock,
            orders: {
              ...rootStateMock.orders,
              total: 50,
            },
          }}
        />
      ),
    });

    expect(result.current.shouldHavePagination).toBeTruthy();
  });

  test('change page', () => {
    const NEXT_PAGE = 4;

    const { result } = renderHook(() => useServeOrdersPagination(), { wrapper: Wrapper });

    act(() => {
      result.current.onPageChange(NEXT_PAGE);
    });

    expect(global.scrollTo).toBeCalledWith({ behavior: 'smooth', top: 0 });
    expect(getOrders).toBeCalledWith({
      filters: [],
      limit: ORDERS_LIMIT,
      offset: (NEXT_PAGE - FIRST_ORDER_PAGINATION_PAGE) * ORDERS_LIMIT,
    });
  });
});
