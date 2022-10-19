import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Stats } from '@src/common/api/Api';
import OrderCitiesChart from '../components/OrderCitiesChart';
import OrderCustomerBarChart from '../components/OrderCustomerBarChart';
import OrderDeviceBarChart from '../components/OrderDeviceBarChart';
import OrderStatusPie from '../components/OrderStatusPie';
import OrderStatusAreaChart from '../components/OrderStatusAreaChart';
import { IStats } from '../types';
import DeviceCategoriesBarChart from '../components/DeviceCategoriesBarChart';

function StatsView() {
  const [stats, setStats] = useState<IStats | undefined>();

  useEffect(() => {
    Stats.get().then((res) => {
      setStats(res.data.stats);
    });
  }, []);

  return (
    <Container>
      <OrderDeviceBarChart items={stats?.devices} />
      <StatusStatsWrapper>
        <OrderStatusPie items={stats?.statuses} />
        <OrderStatusAreaChart items={stats?.statuses} />
      </StatusStatsWrapper>
      <DeviceCategoriesBarChart items={stats?.categories} />
      <OrderCustomerBarChart items={stats?.customers} />
      <OrderCitiesChart items={stats?.cities} />
    </Container>
  );
}

const StatusStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
}
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default StatsView;
