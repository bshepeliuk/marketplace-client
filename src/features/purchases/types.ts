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

export const OrderStatus = {
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
export type OrderStatusValues = typeof OrderStatus[Keys];

export interface IOrderItem {
  id: number;
  orderId: number;
  quantity: number;
  status: OrderStatusValues;
  deviceId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDevice extends IDevice {
  orderDevice: IOrderItem | number;
}

export interface IOrder {
  id: number;
  createdAt: string;
  updatedAt: string;
  address: IShippingAddress | number;
  devices: IOrderDevice[] | number[];
  phone: string;
  fullName: string;
}

export interface IOrderEntities extends DeviceEntities {
  addresses: Record<string, IShippingAddress>;
  orders: Record<string, IOrderItem>;
  purchases: Record<string, IOrder>;
}

export interface IPurchaseData {
  result: number[];
  entities: IOrderEntities;
}
