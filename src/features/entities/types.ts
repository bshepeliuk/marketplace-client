import { ICategory } from '../categories/types';
import { IComment } from '../comments/types';
import { IDevice, IDeviceImage, IDeviceInfo, IDeviceRating } from '../devices/types';
import { IOrder, IPurchase, IShippingAddress } from '../purchases/types';

export interface IEntitiesState {
  devices: Record<string, IDevice>;
  categories: Record<string, ICategory>;
  images: Record<string, IDeviceImage>;
  info: Record<string, IDeviceInfo>;
  ratings: Record<string, IDeviceRating>;
  comments: Record<string, IComment>;
  addresses: Record<string, IShippingAddress>;
  orders: Record<string, IOrder>;
  purchases: Record<string, IPurchase>;
}

export type EntityKeys = keyof IEntitiesState;
