import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import useGetStats from '../hooks/useGetStats';
import DeviceStatsView from '../components/DeviceStatsView';
import CustomerStatsView from '../components/CustomerStatsView';
import OrderStatsView from '../components/OrderStatsView';
import StatsNavMenu from '../components/StatsNavMenu';

function StatsView() {
  const stats = useGetStats();

  return (
    <Container>
      <StatsNavMenu />

      <Routes>
        <Route path="/" element={<DeviceStatsView stats={stats} />} />
        <Route path="/orders" element={<OrderStatsView stats={stats} />} />
        <Route path="/customer" element={<CustomerStatsView stats={stats} />} />
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
