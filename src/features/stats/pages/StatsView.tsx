import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import useGetStats from '../hooks/useGetStats';
import DeviceStatsView from '../components/devices/DeviceStatsView';
import CustomerStatsView from '../components/customers/CustomerStatsView';
import OrderStatsView from '../components/orders/OrderStatsView';
import StatsNavMenu from '../components/StatsNavMenu';

function StatsView() {
  useGetStats();

  return (
    <Container>
      <StatsNavMenu />

      <Routes>
        <Route path="/" element={<DeviceStatsView />} />
        <Route path="/orders" element={<OrderStatsView />} />
        <Route path="/customer" element={<CustomerStatsView />} />
        <Route path="*" element={<div>Not Found....</div>} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default StatsView;
