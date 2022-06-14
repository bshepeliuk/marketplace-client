import cartReducer, {
  initialState,
  cartActions,
} from '@src/features/cart/cartSlice';

const device = {
  id: 2,
  name: 'HP Pavillion 15 eh1021-ua',
  price: 33448,
  brandId: 2,
  typeId: 1,
  userId: 1,
  quantity: 1,
  images: [],
  info: [],
  count: 1,
  createdAt: '2022-01-05T16:57:37.787Z',
  updatedAt: '2022-01-05T16:57:37.787Z',
};

describe('[REDUCER]: cart', () => {
  test('should return initial state when action type does not match', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(cartReducer(initialState, action)).toEqual(initialState);
  });

  test('should add device to cart', () => {
    const action = {
      type: cartActions.addToCart.type,
      payload: { device },
    };

    expect(cartReducer(initialState, action)).toEqual({
      ...initialState,
      items: [device],
    });
  });

  test('should remove device from cart', () => {
    const action = {
      type: cartActions.removeFromCart.type,
      payload: { device },
    };

    expect(cartReducer({ ...initialState, items: [device] }, action)).toEqual({
      ...initialState,
      items: [],
    });
  });
});
