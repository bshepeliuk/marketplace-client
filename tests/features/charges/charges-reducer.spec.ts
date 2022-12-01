import reducer, { getCharges, initialState } from '@src/features/charges/chargesSlice';

describe('[REDUCER]: charges', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  test('[getCharges.pending]: isLoading should be true', () => {
    const action = {
      type: getCharges.pending.type,
      payload: undefined,
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[getCharges.fulfilled]: should set bounds of list, save ID of first item.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const charges = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getCharges.fulfilled.type,
      payload: {
        hasMore: true,
        charges,
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
      items: charges,
    });
  });

  test('[getCharges.fulfilled]: in case have no more items, should save ID of last item.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const charges = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getCharges.fulfilled.type,
      payload: {
        hasMore: false,
        charges,
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
      items: charges,
    });
  });

  test('[getCharges.rejected]: isError should be true.', () => {
    const firstItemId = 'first-id';
    const lastItemId = 'last-id';
    const charges = [{ id: firstItemId }, { id: lastItemId }];
    const action = {
      type: getCharges.rejected.type,
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
