import reducer, { getPayouts, initialState } from '@src/features/payouts/payoutsSlice';

describe('[REDUCER]: payouts', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  test('[getPayouts.pending]: isLoading should be true', () => {
    const action = {
      type: getPayouts.pending.type,
      payload: undefined,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[getPayouts.fulfilled]: should change bounds of list, save ID of first item.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const payouts = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getPayouts.fulfilled.type,
      payload: {
        hasMore: true,
        payouts,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      firstItemId,
      lastItemId: null,
      isLoading: false,
      isError: false,
      endingBefore: firstItemId,
      startingAfter: lastItemId,
      items: payouts,
    });
  });

  test('[getPayouts.fulfilled]: in case have no more items, should save ID of last item.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const payouts = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getPayouts.fulfilled.type,
      payload: {
        hasMore: false,
        payouts,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      firstItemId,
      lastItemId,
      isLoading: false,
      isError: false,
      hasMore: false,
      endingBefore: firstItemId,
      startingAfter: lastItemId,
      items: payouts,
    });
  });

  test('[getPayouts.rejected]: isError should be true.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const charges = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getPayouts.rejected.type,
      payload: {
        hasMore: false,
        charges,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
