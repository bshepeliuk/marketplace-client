import reducer, { getTransfers, initialState } from '@src/features/transfers/transfersSlice';

describe('[REDUCER]: transfers', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  test('[getTransfers.pending]: isLoading should be true', () => {
    const action = {
      type: getTransfers.pending.type,
      payload: undefined,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[getTransfers.fulfilled]: should set bounds of list, save ID of first item.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const transfers = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getTransfers.fulfilled.type,
      payload: {
        hasMore: true,
        transfers,
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
      items: transfers,
    });
  });

  test('[getTransfers.fulfilled]: in case have no more items, should save ID of last item.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const transfers = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getTransfers.fulfilled.type,
      payload: {
        hasMore: false,
        transfers,
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
      items: transfers,
    });
  });

  test('[getTransfers.rejected]: isError should be true.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const transfers = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getTransfers.rejected.type,
      payload: {
        hasMore: false,
        transfers,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
