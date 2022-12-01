import categoriesReducer, { addCategory, getCategories, initialState } from '@src/features/categories/categoriesSlice';

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

  test('[getCategories.fulfilled]: categories should be changed.', () => {
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

  test('[addCategory.pending]: isCreating should be true', () => {
    const action = {
      type: addCategory.pending.type,
    };

    expect(categoriesReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: true,
      isCreatingError: false,
    });
  });

  test('[addCategory.fulfilled]: new category should be added.', () => {
    const action = {
      type: addCategory.fulfilled.type,
      payload: { result: 4 },
    };

    expect(categoriesReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: false,
      items: [4],
    });
  });

  test('[addCategory.rejected]: isCreatingError should be true', () => {
    const action = {
      type: addCategory.rejected.type,
    };

    expect(categoriesReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: false,
      isCreatingError: true,
    });
  });
});
