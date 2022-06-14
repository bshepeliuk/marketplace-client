import brandsReducer, {
  initialState,
  getBrands,
} from '@src/features/brands/brandsSlice';
import { brands } from '../../mocks/data';

describe('[REDUCER]: brands', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(brandsReducer(initialState, action)).toEqual(initialState);
  });

  test('[getBrands.pending]: isLoading - true.', () => {
    const action = {
      type: getBrands.pending.type,
      payload: undefined,
    };

    expect(brandsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
    });
  });

  test('[getBrands.fullfilled]: brands should be changed.', () => {
    const action = {
      type: getBrands.fulfilled.type,
      payload: { brands },
    };

    expect(brandsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: brands,
    });
  });

  test('[getBrands.rejected]: isError should be equal true', () => {
    const action = {
      type: getBrands.rejected.type,
      payload: { brands },
    };

    expect(brandsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
});
