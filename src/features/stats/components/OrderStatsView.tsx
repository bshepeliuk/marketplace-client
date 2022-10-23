import React from 'react';
import styled from 'styled-components';

import OrderStatusAreaChart from './OrderStatusAreaChart';
import OrderStatusPie from './OrderStatusPie';
import OrderDateScatterChart from './OrderDateScatterChart';
import OrderTimeScatterChart from './OrderTimeScatterChart';

function OrderStatsView() {
  return (
    <Container>
      <StatusWrapper>
        <OrderStatusPie />
        <OrderStatusAreaChart />
      </StatusWrapper>

      <OrderDateWrapper>
        <OrderDateScatterChart />
      </OrderDateWrapper>

      <OrderDateWrapper>
        <OrderTimeScatterChart />
      </OrderDateWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  flex-flow: column wrap;
`;

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OrderDateWrapper = styled.div`
  width: 100%;
`;

export default OrderStatsView;
