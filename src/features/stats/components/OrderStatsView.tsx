import React from 'react';
import styled from 'styled-components';

import { IStats } from '../types';
import OrderStatusAreaChart from './OrderStatusAreaChart';
import OrderStatusPie from './OrderStatusPie';

interface IProps {
  stats?: IStats;
}

function OrderStatsView({ stats }: IProps) {
  return (
    <StatusStatsWrapper>
      <OrderStatusPie items={stats?.statuses} />
      <OrderStatusAreaChart items={stats?.statuses} />
    </StatusStatsWrapper>
  );
}

const StatusStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
`;

export default OrderStatsView;
