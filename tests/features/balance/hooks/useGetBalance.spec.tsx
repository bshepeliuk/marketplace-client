import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useGetBalance from '@src/features/balance/hooks/useGetBalance';
import { getBalance } from '@src/features/balance/balanceSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/balance/balanceSlice', () => ({
  ...jest.requireActual('@src/features/balance/balanceSlice'),
  __esModule: true,
  getBalance: jest.fn(),
}));

describe('[HOOK]: useGetBalance', () => {
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
    const { result } = renderHook(() => useGetBalance(), { wrapper: Wrapper });

    expect(result.current.balance).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });

  test('In case balance is empty, should fetch it.', () => {
    renderHook(() => useGetBalance(), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={{ ...rootStateMock, balance: { ...rootStateMock.balance, current: null } }} />
      ),
    });

    expect(getBalance).toBeCalledTimes(1);
  });
});
