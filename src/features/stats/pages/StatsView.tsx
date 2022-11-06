import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import useFetchStats from '../hooks/useFetchStats';
import DeviceStatsView from '../components/devices/DeviceStatsView';
import CustomerStatsView from '../components/customers/CustomerStatsView';
import OrderStatsView from '../components/orders/OrderStatsView';
import StatsNavMenu from '../components/StatsNavMenu';
import StatsFilter from '../components/StatsFilter';

function StatsView() {
  const [searchParams] = useSearchParams();
  const { fetchStats } = useFetchStats();

  useEffect(() => {
    const filters = [...searchParams.entries()];

    fetchStats({ filters });
  }, []);

  return (
    <Container>
      <StatsNavMenu />

      <FilterWrapper>
        <StatsFilter />
      </FilterWrapper>

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
  height: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 40px;
  overflow: auto;
  padding: 0 15px;
`;

export default StatsView;
