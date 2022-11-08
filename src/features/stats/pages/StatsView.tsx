import React, { RefObject, TouchEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import useHandleScrollOnMouseEvents from '@common/hooks/useHandleScrollOnMouseEvents';
import useScrollOnTouchEvents from '@src/common/hooks/useScrollOnTouchEvents';
import useFetchStats from '../hooks/useFetchStats';
import DeviceStatsView from '../components/devices/DeviceStatsView';
import CustomerStatsView from '../components/customers/CustomerStatsView';
import OrderStatsView from '../components/orders/OrderStatsView';
import StatsNavMenu from '../components/StatsNavMenu';
import StatsFilter from '../components/StatsFilter';

function StatsView() {
  const filterWrapRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const { fetchStats } = useFetchStats();
  const { onTouchMove, onTouchStart } = useScrollOnTouchEvents({ ref: filterWrapRef });

  useHandleScrollOnMouseEvents({ ref: filterWrapRef });

  useEffect(() => {
    const filters = [...searchParams.entries()];

    fetchStats({ filters });
  }, []);

  return (
    <Container>
      <StatsNavMenu />

      <FilterWrapper ref={filterWrapRef} onTouchMove={onTouchMove} onTouchStart={onTouchStart}>
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
  overflow: hidden;
  padding: 0 15px;
`;

export default StatsView;
