import { ICategory } from '../categories/types';
import { IDevice } from '../devices/types';

export interface IDeviceEntity {
  [deviceId: string]: IDevice;
}

export interface ICategoriesEntity {
  [categoryId: string]: ICategory;
}

export interface IEntitiesState {
  devices: IDeviceEntity;
  categories: ICategoriesEntity;
}

export type EntityKeys = keyof IEntitiesState;
