import statsReducer, { getStats, initialState } from '@src/features/stats/statsSlice';
import { statsGetResponse } from '../../mocks/api/responses';

describe('[REDUCER]: Stats', () => {
  test('should return initial state', () => {
    const action = {
      type: 'TESTS/SOME_ACTION',
    };

    expect(statsReducer(initialState, action)).toEqual(initialState);
  });

  test('isLoading should be true when client starts to fetch stats', () => {
    const action = {
      type: getStats.pending.type,
    };

    expect(statsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('isLoading should be false when client received stats', () => {
    const action = {
      type: getStats.fulfilled.type,
      payload: statsGetResponse,
    };

    expect(statsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: statsGetResponse.stats,
    });
  });

  test('isError should be true when something went wrong!', () => {
    const action = {
      type: getStats.rejected.type,
      payload: { message: 'Something went wrong!' },
    };

    expect(statsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
