import React, { useRef } from 'react';
import { convertDayToMs } from '@common/utils/convertDayToMs';
import DeviceListView from '@src/features/devices/components/DeviceListView';
import useGetRecentlyViewed from '../hooks/useGetRecentlyViewed';
import useDeleteViewedOnTTLExpired from '../hooks/useDeleteViewedOnTTLExpired';
import { Container, Empty } from '../styles/recentlyViewed.styled';

function RecentlyViewedDevices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const recentlyViewed = useGetRecentlyViewed();

  useDeleteViewedOnTTLExpired({ ttlInMs: convertDayToMs(5) });

  if (recentlyViewed.length === 0) {
    return <Empty>You have not viewed any devices yet.</Empty>;
  }

  return (
    <Container ref={containerRef}>
      <DeviceListView containerRef={containerRef} items={recentlyViewed} />
    </Container>
  );
}

export default RecentlyViewedDevices;
