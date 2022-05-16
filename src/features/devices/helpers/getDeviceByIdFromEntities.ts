import { IEntitiesState } from '@src/features/entities/types';

const getDeviceByIdFromEntities = (
  deviceId: number,
  entities: IEntitiesState,
) => {
  const device = entities.devices[deviceId];

  return {
    ...device,
    images: device.images.map((imgId) => entities.images[imgId as number]),
    info: device.info.map((infoId) => entities.info[infoId as number]),
  };
};

export default getDeviceByIdFromEntities;
