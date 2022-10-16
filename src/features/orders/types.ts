import { ActionMeta, MultiValue } from 'react-select';
import { IDevice } from '../devices/types';
import { OrderStatus } from './constants';

export interface IShippingAddress {
  orderId: number;
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

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
  orderDevice: IOrderItem;
}

export interface IOrder {
  id: number;
  createdAt: string;
  updatedAt: string;
  address: IShippingAddress;
  devices: IOrderDevice[];
  phone: string;
  fullName: string;
}

export interface IOrderStatusOption {
  readonly label: OrderStatusValues;
  readonly value: OrderStatusValues;
}

export interface ISearchOption {
  label: string;
  value: string;
  fieldName: string;
}

export interface IOrderStatusOptionWithColor extends IOrderStatusOption {
  color: string;
}

export interface ISelectorChangeActions {
  [key: string]: (props: {
    options: MultiValue<IOrderStatusOptionWithColor>;
    meta: ActionMeta<IOrderStatusOptionWithColor>;
  }) => void;
}
