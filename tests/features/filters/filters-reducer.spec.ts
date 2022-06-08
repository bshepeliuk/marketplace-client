/* eslint-disable max-len */
import filtersReducer, {
  getFilterOptionsByCategoryId,
  initialState,
} from '@src/features/filters/filtersSlice';

describe('FILTERS REDUCER', () => {
  it('should return initial state when action does not match with expected.', () => {
    const action = {
      type: 'TESTS/UNEXPECTED_ACTION',
    };

    expect(filtersReducer(initialState, action)).toEqual(initialState);
  });

  it('[getFilterOptionsByCategoryId.pending]: isLoading should be true', () => {
    const action = {
      type: getFilterOptionsByCategoryId.pending.type,
      payload: undefined,
    };

    expect(filtersReducer(initialState, action)).toEqual({
      ...initialState,
      options: {
        ...initialState.options,
        isLoading: true,
        isError: false,
      },
    });
  });

  it('[getFilterOptionsByCategoryId.fulfilled]: isLoading should be false, prices should be changed.', () => {
    const filterOption = { id: 2, title: 'RAM', description: '64 GB' };

    const action = {
      type: getFilterOptionsByCategoryId.fulfilled.type,
      payload: { prices: [10, 20], options: [filterOption] },
    };

    expect(filtersReducer(initialState, action)).toEqual({
      ...initialState,
      options: {
        ...initialState.options,
        isLoading: false,
        isError: false,
        prices: [10, 20],
        items: [filterOption],
      },
    });
  });

  it('[getFilterOptionsByCategoryId.rejected]: isLoading should be false, isError should be true.', () => {
    const action = {
      type: getFilterOptionsByCategoryId.rejected.type,
      payload: undefined,
    };

    expect(filtersReducer(initialState, action)).toEqual({
      ...initialState,
      options: {
        ...initialState.options,
        isLoading: false,
        isError: true,
      },
    });
  });
});
