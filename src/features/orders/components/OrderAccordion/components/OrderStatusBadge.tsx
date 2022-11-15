import React from 'react';
import styled from 'styled-components';

import { OrderStatusValues } from '@src/features/orders/types';
import { OrderStatusColor } from '../../../constants';

interface IProps {
  value: OrderStatusValues;
}

function OrderStatusBadge({ value }: IProps) {
  const color = OrderStatusColor[value];

  return <Status color={color}>{value}</Status>;
}

const Status = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  color: #fff;
  letter-spacing: 1px;
  max-height: 35px;
`;

export default OrderStatusBadge;
