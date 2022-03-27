import { IEntitiesState } from '@src/features/entities/types';

const getDeviceByIdFromEntities = (
  deviceId: number,
  entities: IEntitiesState,
) => ({
  ...entities.devices[deviceId],
  images: entities.devices[deviceId].images.map(
    (imgId) => entities.images[imgId as number],
  ),
  info: [],
});

export default getDeviceByIdFromEntities;
