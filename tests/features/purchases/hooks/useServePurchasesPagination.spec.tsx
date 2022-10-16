import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useServePurchasesPagination from '@src/features/purchases/hooks/useServePurchasesPagination';
import { FIRST_ORDER_PAGINATION_PAGE, ORDERS_LIMIT } from '@src/features/orders/constants';
import { getPurchases } from '@src/features/purchases/purchasesSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';
import { rootStateMock } from '../../../mocks/stateMock';

global.scrollTo = jest.fn();

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/purchases/purchasesSlice', () => ({
  ...jest.requireActual('@src/features/purchases/purchasesSlice'),
  __esModule: true,
  getPurchases: jest.fn(),
}));

describe('[HOOK]: useServePurchasesPagination', () => {
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
    const { result } = renderHook(() => useServePurchasesPagination(), { wrapper: Wrapper });

    expect(typeof result.current.onPageChange).toBe('function');
    expect(typeof result.current.currentPage).toBe('number');
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.total).toBeNull();
    expect(result.current.items).toHaveLength(0);
    expect(result.current.shouldHavePagination).toBeFalsy();
  });

  test('should fetch orders on mount.', () => {
    renderHook(() => useServePurchasesPagination(), { wrapper: Wrapper });

    expect(getPurchases).toBeCalledWith({ filters: [], limit: ORDERS_LIMIT, offset: 0 });
  });

  test('in case amount of purchases greater than ORDERS_LIMIT (default=20), should have pagination.', () => {
    const { result } = renderHook(() => useServePurchasesPagination(), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper
          {...props}
          state={{
            ...rootStateMock,
            purchases: {
              ...rootStateMock.purchases,
              total: 50,
            },
          }}
        />
      ),
    });

    expect(result.current.shouldHavePagination).toBeTruthy();
  });

  test('should change pagination page', () => {
    const NEXT_PAGE = 4;

    const { result } = renderHook(() => useServePurchasesPagination(), { wrapper: Wrapper });

    act(() => {
      result.current.onPageChange(NEXT_PAGE);
    });

    expect(global.scrollTo).toBeCalledWith({ behavior: 'smooth', top: 0 });
    expect(getPurchases).toBeCalledWith({
      filters: [],
      limit: ORDERS_LIMIT,
      offset: (NEXT_PAGE - FIRST_ORDER_PAGINATION_PAGE) * ORDERS_LIMIT,
    });
  });
});
