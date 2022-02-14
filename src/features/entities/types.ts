import { IDevice } from '../devices/types';

export interface IDeviceEntity {
  [deviceId: string]: IDevice;
}

export interface IEntitiesState {
  devices: IDeviceEntity;
}

export type EntityKeys = keyof IEntitiesState;
