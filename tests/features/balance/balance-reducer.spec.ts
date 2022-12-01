import reducer, { getBalance, initialState } from '@src/features/balance/balanceSlice';
import { balanceMock } from '../../mocks/data';

describe('[REDUCER]: balance', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  test('[getBalance.pending]: isLoading should be true', () => {
    const action = {
      type: getBalance.pending.type,
      payload: undefined,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[getBalance.fulfilled]: should set bounds of list, save ID of first item.', () => {
    const action = {
      type: getBalance.fulfilled.type,
      payload: {
        balance: balanceMock,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      current: balanceMock,
    });
  });

  test('[getBalance.rejected]: isError should be true.', () => {
    const action = {
      type: getBalance.rejected.type,
      payload: undefined,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
