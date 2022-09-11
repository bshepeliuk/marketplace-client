import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import { IDevice } from '../types';
import getDeviceByIdFromEntities from '../helpers/getDeviceByIdFromEntities';

const getDevicesState = (state: RootState) => state.devices;
const getEntitiesState = (state: RootState) => state.entities;
const getDeviceIdProp = (_: unknown, deviceId: number) => deviceId;
const getCategoryIdProps = (_: unknown, categoryId: string | null) => {
  return categoryId;
};

export const getDeviceByIdSelector = (state: RootState, deviceId: number) => {
  return state.entities.devices[deviceId];
};

export const deviceSelector = createSelector(
  [getEntitiesState, getDevicesState, getDeviceIdProp],
  (entities, deviceState, deviceId) => {
    const device = entities.devices[deviceId] ? getDeviceByIdFromEntities(Number(deviceId), entities) : undefined;

    return {
      device,
      isLoading: deviceState.device.isLoading,
    };
  },
);

export const devicesSelector = createSelector(
  [getDevicesState, getEntitiesState, getCategoryIdProps],
  (state, entities, categoryId) => {
    let items = [] as IDevice[];

    items = state.items.map((id) => getDeviceByIdFromEntities(id, entities));

    if (categoryId) {
      items = items.filter((item) => item.typeId === Number(categoryId));
    }

    return {
      items,
      total: state.total,
      isLoading: state.isLoading,
      isError: state.isError,
      hasNoDevices: state.hasNoDevices,
    };
  },
);
