import { OrderStatusValues } from '../orders/types';

export interface IDeviceStats {
  brandId: number;
  id: number;
  name: string;
  quantity: number;
  typeId: number;
}

export interface IStatusStats {
  quantity: number;
  status: OrderStatusValues;
}

export interface ICustomerStats {
  fullName: string;
  total: number;
  quantity: number;
}

export interface ICitiesStats {
  city: string;
  total: number;
  quantity: number;
}

export interface ICategoriesStats {
  name: string;
  typeId: string;
  total: number;
  quantity: number;
}

export interface IStats {
  devices: IDeviceStats[];
  statuses: IStatusStats[];
  categories: ICategoriesStats[];
  customers: ICustomerStats[];
  cities: ICitiesStats[];
}
