import React, { useRef } from 'react';
import styled from 'styled-components';
import DeviceListView from '@src/features/devices/components/DeviceListView';
import useGetRecentlyViewed from '../hooks/useGetRecentlyViewed';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 80px - 80px);
`;

function RecentlyViewedDevices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const recentlyViewed = useGetRecentlyViewed();

  return (
    <Container ref={containerRef}>
      <DeviceListView containerRef={containerRef} items={recentlyViewed} />
    </Container>
  );
}

export default RecentlyViewedDevices;
