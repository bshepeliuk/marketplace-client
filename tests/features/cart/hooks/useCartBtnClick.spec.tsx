/* eslint-disable max-len */
import React from 'react';
import * as ReactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useCartBtnClick from '@src/features/cart/hooks/useCartBtnClick';
import { cartActions } from '@src/features/cart/cartSlice';
import { Wrapper } from '../../../wrapper';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const addToCartMock = jest.spyOn(cartActions, 'addToCart');
const removeFromCartMock = jest.spyOn(cartActions, 'removeFromCart');

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

describe('[HOOK] useCartBtnClick', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  test('should call addToCart action when device was not added to cart yet.', async () => {
    const { result } = renderHook(() => useCartBtnClick(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.handle(device);
    });

    expect(addToCartMock).toBeCalledWith({ device });
    expect(removeFromCartMock).not.toBeCalled();
  });

  test('should call removeFromCart action when device was added to cart earlier.', async () => {
    const { result } = renderHook(() => useCartBtnClick(), {
      wrapper: (props) => <Wrapper {...props} state={{ cart: { items: [device] } }} />,
    });

    act(() => {
      result.current.handle(device);
    });

    expect(removeFromCartMock).toBeCalledWith({ device });
    expect(addToCartMock).not.toBeCalled();
  });
});
