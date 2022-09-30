import { OrderStatusValues } from '@src/features/orders/types';
import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderStatusSelect from './OrderStatusSelect';

interface IProps {
  status: OrderStatusValues;
  orderId: number;
  isStatusChangeable: boolean;
}

function OrderStatusView({ isStatusChangeable, orderId, status }: IProps) {
  return isStatusChangeable ? (
    <OrderStatusSelect orderDeviceId={orderId} defaultValue={status} />
  ) : (
    <OrderStatusBadge value={status} />
  );
}

export default OrderStatusView;
