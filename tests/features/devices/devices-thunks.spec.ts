import configureMockStore from 'redux-mock-store';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import {
  deviceActions,
  getDeviceById,
  getDevices,
  getMoreDevices,
  initialState,
} from '@features/devices/devicesSlice';
import { BASE_API_URL } from '@src/common/constants';
import { DeviceSchema, DevicesSchema } from '@src/common/normalizeSchemas';
import { normalize } from 'normalizr';
import thunk from 'redux-thunk';
import getActionTypesAndPayload from '../../helpers/getActionTypesAndPayload';
import generateDevicesByCount from '../../helpers/generateDevicesByCount';

const server = setupServer();
const mockStore = configureMockStore([thunk]);

describe('DEVICES THUNKS', () => {
  let store: any;

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
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
    // eslint-disable-next-line max-len
    test('action.payload should have error from server when something went wrong', async () => {
      server.use(
        rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: 'Something went wrong!' }),
          );
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
      };

      server.use(
        rest.get(`${BASE_API_URL}/devices/${device.id}`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ device }));
        }),
      );

      const { entities } = normalize(device, DeviceSchema);

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
          },
        },
      ];

      expect(getActionTypesAndPayload(actualActions)).toEqual(expectedActions);
    });
    // eslint-disable-next-line max-len
    test('should return error message when server responded with error status', async () => {
      const deviceId = 2;

      server.use(
        rest.get(`${BASE_API_URL}/devices/${deviceId}`, (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: 'Please try again later!' }),
          );
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
    test('should return devices and keep hasMore=true while received devices length equal DEVICES_OFFSET=20', async () => {
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
    // eslint-disable-next-line max-len
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
});
