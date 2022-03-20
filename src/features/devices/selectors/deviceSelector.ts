import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import { IDevice } from '../types';

const getDevicesState = (state: RootState) => state.devices;
const getDevicesEntity = (state: RootState) => state.entities.devices;
const getEntitiesState = (state: RootState) => state.entities;
const getDeviceIdProp = (_: unknown, deviceId: string) => deviceId;
const getCategoryIdProps = (_: unknown, categoryId: number | undefined) => {
  return categoryId;
};

export const deviceSelector = createSelector(
  [getDevicesEntity, getDevicesState, getDeviceIdProp],
  (entity, state, deviceId) => {
    return {
      device: entity[deviceId],
      isLoading: state.device.isLoading,
    };
  },
);

export const devicesSelector = createSelector(
  [getDevicesState, getEntitiesState, getCategoryIdProps],
  (state, entities, categoryId) => {
    let items = [] as IDevice[];

    items = state.items.map((id) => ({
      ...entities.devices[id],
      // TODO: refactoring
      images: entities.devices[id].images.map(
        (imgId) => entities.images[imgId as number],
      ),
      info: [],
    }));

    if (categoryId) items = items.filter((item) => item.typeId === categoryId);

    return {
      items,
      isLoading: state.isLoading,
    };
  },
);
