import purchasesReducer, { getPurchases, initialState } from '@src/features/purchases/purchasesSlice';
import { ordersMock } from '../../mocks/data';

describe('[REDUCER]: Purchases', () => {
  test('should return initial state', () => {
    const action = {
      type: 'TESTS/SOME_ACTION',
    };

    expect(purchasesReducer(initialState, action)).toEqual(initialState);
  });

  test('isLoading should be true when client starts to fetch orders', () => {
    const action = {
      type: getPurchases.pending.type,
    };

    expect(purchasesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('should save purchases to state.', () => {
    const action = {
      type: getPurchases.fulfilled.type,
      payload: { purchases: ordersMock, total: 20 },
    };

    expect(purchasesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: action.payload.purchases,
      total: action.payload.total,
    });
  });

  test('isError should be true when something went wrong!', () => {
    const action = {
      type: getPurchases.rejected.type,
      payload: { message: 'Something went wrong!' },
    };

    expect(purchasesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
