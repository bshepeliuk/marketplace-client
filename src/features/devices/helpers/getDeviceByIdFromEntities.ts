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
    ratings: device.ratings.map(
      (ratingId) => entities.ratings[ratingId as number],
    ),
    comments: device.comments.map(
      (commentId) => entities.comments[commentId as number],
    ),
  };
};

export default getDeviceByIdFromEntities;
