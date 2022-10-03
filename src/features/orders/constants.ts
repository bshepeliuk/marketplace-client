import createOption from '@src/common/utils/createSelectOption';

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

export const searchOrderOptions = [
  { ...createOption('Order id'), fieldName: 'id' },
  { ...createOption('Customer'), fieldName: 'fullName' },
  { ...createOption('Phone'), fieldName: 'phone' },
];

export const ORDERS_LIMIT = 20;
