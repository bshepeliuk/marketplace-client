import brandsReducer, {
  initialState,
  getBrands,
  addBrand,
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

  test('[getBrands.fulfilled]: brands should be changed.', () => {
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

  test('[addBrand.pending]: isCreating should be true', () => {
    const action = {
      type: addBrand.pending.type,
      payload: undefined,
    };

    expect(brandsReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: true,
      isCreatingError: false,
    });
  });

  test('[addBrand.fulfilled]: should add a new brand.', () => {
    const newBrand = {
      id: 6,
      name: 'NEW_BRAND',
    };

    const action = {
      type: addBrand.fulfilled.type,
      payload: { brand: newBrand },
    };

    expect(brandsReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: false,
      items: [newBrand],
    });
  });

  test('[addBrand.rejected]: isCreatingError should be true', () => {
    const action = {
      type: addBrand.rejected.type,
      payload: undefined,
    };

    expect(brandsReducer(initialState, action)).toEqual({
      ...initialState,
      isCreatingError: true,
      isCreating: false,
    });
  });
});
