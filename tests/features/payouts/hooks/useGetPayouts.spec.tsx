import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useGetPayouts from '@src/features/payouts/hooks/useGetPayouts';
import { getPayouts } from '@src/features/payouts/payoutsSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/payouts/payoutsSlice', () => ({
  ...jest.requireActual('@src/features/payouts/payoutsSlice'),
  __esModule: true,
  getPayouts: jest.fn(),
}));

describe('[HOOK]: useGetPayouts', () => {
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
    const { result } = renderHook(() => useGetPayouts(), { wrapper: Wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.hasMore).toBeTruthy();
  });

  test('In case payouts are not empty, should not fetch it again.', () => {
    const { result } = renderHook(() => useGetPayouts(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(result.current.items.length).toBeGreaterThan(0);
    expect(getPayouts).not.toBeCalled();
  });

  test('In case payouts are empty, should fetch it.', () => {
    const { result } = renderHook(() => useGetPayouts(), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={{ ...rootStateMock, payouts: { ...rootStateMock.payouts, items: [] } }} />
      ),
    });

    expect(result.current.items.length).toBe(0);
    expect(getPayouts).toBeCalledTimes(1);
  });
});
