import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import { IDevice } from '../types';

const getDevicesState = (state: RootState) => state.devices;
const getDevicesEntity = (state: RootState) => state.entities.devices;
const getDeviceIdProp = (_: any, deviceId: string) => deviceId;
const getCategoryIdProps = (_: any, categoryId: number | undefined) => {
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
  [getDevicesState, getDevicesEntity, getCategoryIdProps],
  (state, devices, categoryId) => {
    let items = [] as IDevice[];
    // TODO:refactoring, need to fix issue with device ids in devices reducer
    if (categoryId === undefined) {
      items = state.items.map((id) => devices[id]);
    } else {
      items = state.items
        .map((id) => devices[id])
        .filter((item) => item.typeId === categoryId);
    }

    return {
      items,
      isLoading: state.isLoading,
    };
  },
);
