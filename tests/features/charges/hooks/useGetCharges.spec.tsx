import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useGetCharges from '@src/features/charges/hooks/useGetCharges';
import { getCharges } from '@src/features/charges/chargesSlice';
import { Wrapper } from '../../../wrapper';
import server from '../../../mocks/api/server';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/charges/chargesSlice', () => ({
  ...jest.requireActual('@src/features/charges/chargesSlice'),
  __esModule: true,
  getCharges: jest.fn(),
}));

describe('[HOOK]: useGetCharges', () => {
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
    const { result } = renderHook(() => useGetCharges(), { wrapper: Wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.hasMore).toBeTruthy();
  });

  test('In case charges are not empty, should not fetch it again.', () => {
    const { result } = renderHook(() => useGetCharges(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(result.current.items.length).toBeGreaterThan(0);
    expect(getCharges).not.toBeCalled();
  });

  test('In case charges are empty, should fetch it.', () => {
    const { result } = renderHook(() => useGetCharges(), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={{ ...rootStateMock, charges: { ...rootStateMock.charges, items: [] } }} />
      ),
    });

    expect(result.current.items.length).toBe(0);
    expect(getCharges).toBeCalledTimes(1);
  });
});
