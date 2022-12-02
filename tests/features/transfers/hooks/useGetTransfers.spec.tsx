import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useGetTransfers from '@src/features/transfers/hooks/useGetTransfers';
import { getTransfers } from '@src/features/transfers/transfersSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/transfers/transfersSlice', () => ({
  ...jest.requireActual('@src/features/transfers/transfersSlice'),
  __esModule: true,
  getTransfers: jest.fn(),
}));

describe('[HOOK]: useGetTransfers', () => {
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

  test('should return initial values.', () => {
    const { result } = renderHook(() => useGetTransfers(), { wrapper: Wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.hasMore).toBeTruthy();
  });

  test('In case transfers are not empty, should not fetch it again.', () => {
    const { result } = renderHook(() => useGetTransfers(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(result.current.items.length).toBeGreaterThan(0);
    expect(getTransfers).not.toBeCalled();
  });

  test('In case transfers are empty, should fetch it.', () => {
    const { result } = renderHook(() => useGetTransfers(), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={{ ...rootStateMock, transfers: { ...rootStateMock.transfers, items: [] } }} />
      ),
    });

    expect(result.current.items.length).toBe(0);
    expect(getTransfers).toBeCalledTimes(1);
  });
});
