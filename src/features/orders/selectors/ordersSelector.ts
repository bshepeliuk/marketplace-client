import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import getDeviceByIdFromEntities from '@src/features/devices/helpers/getDeviceByIdFromEntities';
import { IOrderDevice } from '@src/features/purchases/types';

const getOrdersState = (state: RootState) => state.orders;
const getEntitiesState = (state: RootState) => state.entities;

export const ordersSelector = createSelector([getOrdersState, getEntitiesState], (state, entities) => {
  const items = state.items.map((id) => {
    const purchase = entities.orders[id];
    const addressId = purchase.address as number;
    const deviceIds = purchase.devices as number[];

    const devices = deviceIds.map((deviceId) => {
      const device = getDeviceByIdFromEntities(deviceId, entities) as IOrderDevice;

      const order = typeof device.orderDevice === 'number' ? entities.orderDevices[device.orderDevice] : undefined;

      return {
        ...device,
        order,
      };
    });

    return {
      ...purchase,
      devices,
      address: entities.addresses[addressId],
    };
  });

  return {
    items,
    isLoading: state.isLoading,
  };
});
