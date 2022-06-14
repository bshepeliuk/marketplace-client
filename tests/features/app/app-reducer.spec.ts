import appReducer, {
  initialization,
  initialState,
} from '@src/features/app/appSlice';

describe('APP REDUCER', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(appReducer(initialState, action)).toEqual(initialState);
  });

  test('[initialization.pending]: isLoading should be true, isError - false.', () => {
    const action = {
      type: initialization.pending.type,
      payload: undefined,
    };

    expect(appReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[initialization.fullfilled]: isLoading should be false.', () => {
    const action = {
      type: initialization.fulfilled.type,
      payload: undefined,
    };

    expect(appReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
    });
  });

  test('[initialization.rejected]: isLoading should be false, isError - true.', () => {
    const action = {
      type: initialization.rejected.type,
      payload: undefined,
    };

    expect(appReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
