import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';

const getDevicesState = (state: RootState) => state.devices;
const getDeviceId = (_: any, deviceId: string | undefined) => deviceId;

export const deviceSelector = createSelector(
  [getDevicesState, getDeviceId],
  (state, deviceId) => {
    const device = state.items.find((item) => item.id === Number(deviceId));

    return device;
  },
);
