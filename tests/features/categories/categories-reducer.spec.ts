import categoriesReducer, {
  getCategories,
  initialState,
} from '@src/features/categories/categoriesSlice';

describe('[REDUCER]: categories', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(categoriesReducer(initialState, action)).toEqual(initialState);
  });

  test('[getCategories.pending]: isLoading should be true', () => {
    const action = {
      type: getCategories.pending.type,
      payload: undefined,
    };

    expect(categoriesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[getCategories.fullfilled]: categories should be changed.', () => {
    const action = {
      type: getCategories.fulfilled.type,
      payload: { result: [1, 2, 3, 4] /* ids */ },
    };

    expect(categoriesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: [1, 2, 3, 4],
    });
  });

  test('[getCategories.rejected]: isError should be true', () => {
    const action = {
      type: getCategories.rejected.type,
      payload: { message: '[Categories API]: Something went wrong!' },
    };

    expect(categoriesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
