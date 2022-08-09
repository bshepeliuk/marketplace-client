// eslint-disable-next-line max-len
import getDeviceByIdFromEntities from '@features/devices/helpers/getDeviceByIdFromEntities';
import { DevicesSchema } from '@src/common/normalizeSchemas';
import { DeviceEntities, IDevice } from '@src/features/devices/types';
import { normalize } from 'normalizr';

const deviceId = 2;

const devices = [
  {
    id: deviceId,
    name: 'HP Pavillion 15 eh1021-ua',
    price: 33448,
    brandId: 2,
    typeId: 1,
    userId: 1,
    quantity: 1,
    images: [
      {
        deviceId,
        id: 1,
        url: 'https://some-image.jpg',
      },
    ],
    info: [
      {
        deviceId,
        id: 42,
        typeId: 1,
        title: 'Microprocessor',
        description: 'Intel Core i7',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    ratings: [
      {
        deviceId,
        id: 21,
        rate: 2,
        userId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const { entities } = normalize<IDevice, DeviceEntities, number[]>(
  devices,
  DevicesSchema,
);

describe('[HELPERS]: getDeviceByIdFromEntities', () => {
  test('should return device with all options from entities state correctly.', () => {
    expect(
      getDeviceByIdFromEntities(deviceId, { ...entities, categories: {} }),
    ).toEqual(devices[0]);
  });
});
