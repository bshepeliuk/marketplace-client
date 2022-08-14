import { ICategory } from '../categories/types';
import { IComment } from '../comments/types';
import {
  IDevice,
  IDeviceImage,
  IDeviceInfo,
  IDeviceRating,
} from '../devices/types';

export interface IEntitiesState {
  devices: Record<string, IDevice>;
  categories: Record<string, ICategory>;
  images: Record<string, IDeviceImage>;
  info: Record<string, IDeviceInfo>;
  ratings: Record<string, IDeviceRating>;
  comments: Record<string, IComment>;
}

export type EntityKeys = keyof IEntitiesState;
