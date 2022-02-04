import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

const getDeviceIdsState = (state: RootState) => state.devices.items;
const getDevicesEntity = (state: RootState) => state.entities.devices;
const getDeviceIdProp = (_: any, deviceId: string) => deviceId;

export const deviceSelector = createSelector(
  [getDevicesEntity, getDeviceIdProp],
  (devices, deviceId) => {
    return devices[deviceId];
  },
);

export const devicesSelector = createSelector(
  [getDeviceIdsState, getDevicesEntity],
  (ids, devices) => {
    const items = ids.map((id) => devices[id]);

    return {
      items,
    };
  },
);
