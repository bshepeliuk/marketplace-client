import { OrderStatus } from '../purchases/types';

export const OrderStatusColor = {
  [OrderStatus.paid]: '#1dd1a1',
  [OrderStatus.delivered]: '#20bf6b',
  [OrderStatus.completed]: '#51B164',
  [OrderStatus.unpaid]: '#ff6348',
  [OrderStatus.shipped]: '#7d5fff',
  [OrderStatus.inProgress]: '#4bcffa',
  [OrderStatus.processing]: '#eccc68',
  [OrderStatus.unshipped]: '#38ada9',
  [OrderStatus.refunded]: '#8e44ad',
  [OrderStatus.rejected]: '#f53b57',
} as const;
