import { DeviceEntities, IDevice } from '../devices/types';

export interface IShippingAddress {
  orderId: number;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

const OrderStatus = {
  paid: 'PAID',
  processing: 'PROCESSING',
  inProgress: 'IN PROGRESS',
  unpaid: 'UNPAID',
  delivered: 'DELIVERED',
  shipped: 'SHIPPED',
  unshipped: 'UNSHIPPED',
  rejected: 'REJECTED',
  completed: 'COMPLETED',
  refunded: 'REFUNDED',
} as const;

type Keys = keyof typeof OrderStatus;
type Values = typeof OrderStatus[Keys];

export interface IOrder {
  id: number;
  orderId: number;
  quantity: number;
  status: Values;
  deviceId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDevice extends IDevice {
  order: IOrder | number;
}

export interface IPurchase {
  id: number;
  createdAt: string;
  updatedAt: string;
  address: IShippingAddress | number;
  devices: IOrderDevice[] | number[];
  phone: string;
}

export interface IPurchaseEntities extends DeviceEntities {
  addresses: Record<string, IShippingAddress>;
  orders: Record<string, IOrder>;
  purchases: Record<string, IPurchase>;
}

export interface IPurchaseData {
  result: number[];
  entities: IPurchaseEntities;
}
