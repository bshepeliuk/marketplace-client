import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/app/store';
import getDeviceByIdFromEntities from '@src/features/devices/helpers/getDeviceByIdFromEntities';
import { IOrderDevice } from '../types';

const getPurchasesState = (state: RootState) => state.purchases;
const getEntitiesState = (state: RootState) => state.entities;

export const purchasesSelector = createSelector([getPurchasesState, getEntitiesState], (state, entities) => {
  const items = state.items.map((id) => {
    const purchase = entities.purchases[id];
    const addressId = purchase.address as number;
    const deviceIds = purchase.devices as number[];

    const devices = deviceIds.map((deviceId) => {
      const device = getDeviceByIdFromEntities(deviceId, entities) as IOrderDevice;

      const order = typeof device.order === 'number' ? entities.orders[device.order] : undefined;

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
