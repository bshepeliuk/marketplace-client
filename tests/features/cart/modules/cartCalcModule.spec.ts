/* eslint-disable max-len */
import cartCalcReducer, {
  cartCalcActions,
  cartCalcInitState,
} from '@src/features/cart/modules/cartCalcModule';
import { IDevice } from '@src/features/devices/types';

const device: IDevice = {
  id: 2,
  name: 'HP Pavillion 15 eh1021-ua',
  price: 33448,
  brandId: 2,
  typeId: 1,
  userId: 1,
  quantity: 1,
  images: [],
  info: [],
  createdAt: '2022-01-05T16:57:37.787Z',
  updatedAt: '2022-01-05T16:57:37.787Z',
};

describe('[MODULE]: calculate cart', () => {
  test('should return initial state when action type does not match', () => {
    expect(cartCalcReducer(cartCalcInitState, {} as any)).toEqual(
      cartCalcInitState,
    );
  });

  test('should add default value of counter', () => {
    expect(
      cartCalcReducer(
        cartCalcInitState,
        cartCalcActions.addDefaultCounter([device]),
      ),
    ).toEqual({
      ...cartCalcInitState,
      devices: cartCalcInitState.devices.concat({ ...device, count: 1 }),
    });
  });

  test('should update value of counter and recalculate total sum.', () => {
    const state = { ...cartCalcInitState, devices: [{ ...device, count: 1 }] };

    expect(
      cartCalcReducer(
        state,
        cartCalcActions.updateCounter({ id: 2, count: 4 }),
      ),
    ).toEqual({
      ...cartCalcInitState,
      sum: 4 * device.price,
      devices: cartCalcInitState.devices.concat({ ...device, count: 4 }),
    });
  });

  test('should return prev sum and value of counter in case cart does not have device with passed ID.', () => {
    const devices = [{ ...device, count: 1 }];

    const state = { ...cartCalcInitState, devices };

    expect(
      cartCalcReducer(
        state,
        cartCalcActions.updateCounter({ id: 1000, count: 4 }),
      ),
    ).toEqual({
      ...cartCalcInitState,
      devices,
      sum: device.price,
    });
  });

  test('should calculate total sum.', () => {
    const devices = [
      { ...device, count: 1, price: 20 },
      { ...device, id: 2, count: 1, price: 20 },
      { ...device, id: 3, count: 2, price: 30 },
    ];
    const state = {
      ...cartCalcInitState,
      devices,
    };

    expect(cartCalcReducer(state, cartCalcActions.sum())).toEqual({
      ...cartCalcInitState,
      devices,
      sum: devices.reduce(
        (prev, current) => prev + current.price * current.count,
        0,
      ),
    });
  });
});
