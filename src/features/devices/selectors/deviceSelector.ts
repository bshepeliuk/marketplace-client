import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

const getDevicesState = (state: RootState) => state.devices;
const getDevicesEntity = (state: RootState) => state.entities.devices;
const getDeviceIdProp = (_: any, deviceId: string) => deviceId;

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
  [getDevicesState, getDevicesEntity],
  (state, devices) => {
    const items = state.items.map((id) => devices[id]);

    return {
      items,
      isLoading: state.isLoading,
    };
  },
);
