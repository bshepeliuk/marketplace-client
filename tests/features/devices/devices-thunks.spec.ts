import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {
  createDevice,
  deviceActions,
  evaluateDevice,
  getDeviceById,
  getDevices,
  getMoreDevices,
  initialState,
} from '@features/devices/devicesSlice';
import { DeviceEntities, IDevice, IDeviceRating } from '@src/features/devices/types';
import { BASE_API_URL } from '@src/common/constants';
import { DeviceSchema, DevicesSchema, RatingSchema } from '@src/common/normalizeSchemas';
import { normalize } from 'normalizr';
import thunk from 'redux-thunk';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import generateDevicesByCount from '../../helpers/generateDevicesByCount';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('DEVICES THUNKS', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  afterAll(() => server.close());
  beforeEach(() => {
    store = mockStore({
      devices: {
        ...initialState,
        items: Array(22),
      },
    });
  });

  describe('get all devices', () => {
    test('should return devices successfully', async () => {
      const devicesResponse = [
        {
          id: 22,
          name: 'ASUS',
          brandId: 1,
          typeId: 1,
          price: 1000,
          images: [{ id: 1, url: 'https://image.jpg' }],
          info: [],
          ratings: [],
        },
      ];

      const { result, entities } = normalize(devicesResponse, DevicesSchema);

      server.use(
        rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ devices: devicesResponse }));
        }),
      );

      await store.dispatch(getDevices({ offset: 0, limit: 20 }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getDevices.pending.type,
          payload: undefined,
        },
        {
          type: deviceActions.hasNoMore.type,
          payload: {
            hasMore: false,
          },
        },
        {
          type: getDevices.fulfilled.type,
          payload: {
            result,
            entities,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('action.payload should have error from server when something went wrong', async () => {
      server.use(
        rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Something went wrong!' }));
        }),
      );

      await store.dispatch(getDevices({ offset: 0, limit: 20 }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getDevices.pending.type,
          payload: undefined,
        },
        {
          type: getDevices.rejected.type,
          payload: {
            message: 'Something went wrong!',
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('get device by id', () => {
    test('should return device by id', async () => {
      const device = {
        id: 22,
        name: 'ASUS',
        brandId: 1,
        typeId: 1,
        price: 1000,
        images: [{ url: 'https://image.jpg' }],
        ratings: [],
      };

      server.use(
        rest.get(`${BASE_API_URL}/devices/${device.id}`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ device }));
        }),
      );

      const { result, entities } = normalize(device, DeviceSchema);

      await store.dispatch(getDeviceById({ deviceId: device.id }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getDeviceById.pending.type,
          payload: undefined,
        },
        {
          type: getDeviceById.fulfilled.type,
          payload: {
            device,
            entities,
            result,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error message when server responded with error status', async () => {
      const deviceId = 2;

      server.use(
        rest.get(`${BASE_API_URL}/devices/${deviceId}`, (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Please try again later!' }));
        }),
      );

      await store.dispatch(getDeviceById({ deviceId }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getDeviceById.pending.type,
          payload: undefined,
        },
        {
          type: getDeviceById.rejected.type,
          payload: {
            message: 'Please try again later!',
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('get more devices', () => {
    test('hasNoMore should be true', () => {
      store.dispatch(deviceActions.hasNoMore({ hasMore: true }));

      const actualActions = store.getActions();

      const expectedActions = [
        {
          type: deviceActions.hasNoMore.type,
          payload: { hasMore: true },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    // eslint-disable-next-line max-len
    test('should return devices and change hasMore to false when received devices length less than DEVICES_OFFSET=20', async () => {
      const devices = [
        {
          id: 22,
          name: 'ASUS',
          brandId: 1,
          typeId: 1,
          price: 1000,
          images: [{ url: 'https://image.jpg' }],
          ratings: [],
        },
      ];

      const { result, entities } = normalize(devices, DevicesSchema);

      server.use(
        rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              devices,
            }),
          );
        }),
      );

      await store.dispatch(getMoreDevices({ filters: [['categoryId', '']] }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getMoreDevices.pending.type,
          payload: undefined,
        },
        {
          type: deviceActions.hasNoMore.type,
          payload: { hasMore: false },
        },
        {
          type: getMoreDevices.fulfilled.type,
          payload: {
            result,
            entities,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
    // eslint-disable-next-line max-len
    test('should return devices and keep hasMore=true while received devices length equal to limit', async () => {
      const devices = generateDevicesByCount(20);

      const { result, entities } = normalize(devices, DevicesSchema);

      server.use(
        rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              devices,
            }),
          );
        }),
      );

      await store.dispatch(getMoreDevices({ filters: [['categoryId', '']] }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getMoreDevices.pending.type,
          payload: undefined,
        },
        {
          type: getMoreDevices.fulfilled.type,
          payload: {
            result,
            entities,
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error message when server responded with error status ', async () => {
      server.use(
        rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({
              message: 'Some server error!',
            }),
          );
        }),
      );

      await store.dispatch(getMoreDevices({ filters: [['categoryId', '']] }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: getMoreDevices.pending.type,
          payload: undefined,
        },
        {
          type: getMoreDevices.rejected.type,
          payload: {
            message: 'Some server error!',
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('create a new device', () => {
    const newDeviceParams = {
      images: [],
      info: { id: 1, name: 'ASUS 10', price: '10000', quantity: '5' },
      brandId: 1,
      categoryId: 1,
      features: [{ id: 1, title: 'RAM', description: '16 GB' }],
    };

    const createdDevice = {
      id: newDeviceParams.info.id,
      name: newDeviceParams.info.name,
      quantity: newDeviceParams.info.quantity,
      price: newDeviceParams.info.price,
      images: [],
      info: newDeviceParams.features,
    };

    test('should add a new device successfully', async () => {
      server.use(
        rest.post(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              device: createdDevice,
            }),
          );
        }),
      );

      const { result, entities } = normalize(createdDevice, DeviceSchema);

      await store.dispatch(createDevice(newDeviceParams));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: createDevice.pending.type,
          payload: undefined,
        },
        {
          type: createDevice.fulfilled.type,
          payload: { result, entities },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return an error when device was not added', async () => {
      const error = {
        message: '[NEW DEVICE]: something went wrong.',
      };

      server.use(
        rest.post(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({
              message: error.message,
            }),
          );
        }),
      );

      await store.dispatch(createDevice(newDeviceParams));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: createDevice.pending.type,
          payload: undefined,
        },
        {
          type: createDevice.rejected.type,
          payload: { message: error.message },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });

  describe('evaluate device', () => {
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
      ratings: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { entities } = normalize<IDevice, DeviceEntities, number[]>([device], DevicesSchema);

    beforeEach(() => {
      store = mockStore({
        entities,
      });
    });

    test('should add received rating to device from state.', async () => {
      const rating = {
        id: 24,
        rate: 4,
        userId: 1,
        deviceId: device.id,
      };

      server.use(
        rest.post(`${BASE_API_URL}/ratings`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              rating,
            }),
          );
        }),
      );

      const ratingEntity = normalize<IDeviceRating, Pick<DeviceEntities, 'ratings'>, number>(rating, RatingSchema);

      await store.dispatch(evaluateDevice({ rating: 4, deviceId: device.id }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: evaluateDevice.pending.type,
          payload: undefined,
        },
        {
          type: evaluateDevice.fulfilled.type,
          payload: {
            result: ratingEntity.result,
            entities: {
              ...entities,
              ...ratingEntity.entities,
              devices: {
                [rating.deviceId]: {
                  ...entities.devices[rating.deviceId],
                  ratings: [rating.id],
                },
              },
            },
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });

    test('should return error from API when something went wrong.', async () => {
      const error = {
        message: '[Rating API]: something went wrong',
      };

      server.use(
        rest.post(`${BASE_API_URL}/ratings`, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({
              message: error.message,
            }),
          );
        }),
      );

      await store.dispatch(evaluateDevice({ rating: 4, deviceId: device.id }));

      const actualActions = store.getActions();
      const expectedActions = [
        {
          type: evaluateDevice.pending.type,
          payload: undefined,
        },
        {
          type: evaluateDevice.rejected.type,
          payload: { message: error.message },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
  });
});
