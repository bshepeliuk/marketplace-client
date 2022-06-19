import { IDevice, IDeviceWithCount } from '@src/features/devices/types';

type CartCalcAction =
  | {
      type: typeof types.ADD_DEFAULT_COUNT;
      payload: {
        devices: IDevice[];
      };
    }
  | { type: typeof types.SUM }
  | {
      type: typeof types.UPDATE_DEVICE_COUNTER;
      payload: {
        deviceId: number;
        count: number;
      };
    };

const types = {
  ADD_DEFAULT_COUNT: 'ADD_DEFAULT_COUNT',
  SUM: 'SUM',
  UPDATE_DEVICE_COUNTER: 'UPDATE_DEVICE_COUNTER',
} as const;

export const cartCalcActions = {
  addDefaultCounter: (items: IDevice[]) => ({
    type: types.ADD_DEFAULT_COUNT,
    payload: { devices: items },
  }),
  sum: () => ({ type: types.SUM }),
  updateCounter: ({ id, count }: { id: number; count: number }) => ({
    type: types.UPDATE_DEVICE_COUNTER,
    payload: { deviceId: id, count },
  }),
};

export const cartCalcInitState = {
  devices: [] as IDeviceWithCount[],
  sum: 0,
};

type State = typeof cartCalcInitState;

function cartCalcReducer(state: State, action: CartCalcAction): State {
  switch (action.type) {
    case types.ADD_DEFAULT_COUNT: {
      const devices = action.payload.devices.reduce((prev, current) => {
        return [...prev, { ...current, count: 1 }];
      }, [] as IDeviceWithCount[]);

      return {
        ...state,
        devices,
      };
    }

    case types.UPDATE_DEVICE_COUNTER: {
      const { deviceId, count } = action.payload;

      const devices = state.devices.reduce((prev, current) => {
        if (current.id === deviceId) {
          return [...prev, { ...current, count }];
        }

        return [...prev, current];
      }, [] as IDeviceWithCount[]);

      const sum = getCartSum(devices);

      return {
        ...state,
        devices,
        sum,
      };
    }

    case types.SUM: {
      const sum = getCartSum(state.devices);

      return {
        ...state,
        sum,
      };
    }
    default:
      return state;
  }
}

export const getCartSum = (items: IDeviceWithCount[]) => {
  return items.reduce((prev, curr) => prev + curr.price * curr.count, 0);
};

export default cartCalcReducer;
