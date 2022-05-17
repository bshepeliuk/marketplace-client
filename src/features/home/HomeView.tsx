import React, { useRef } from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import DeviceListView from '../devices/components/DeviceListView';
import { DeviceListContainer } from './home.styled';
import CategoriesListView from '../categories/components/CategoriesListView';
import useGetDevices from '../devices/hooks/useGetDevices';
import useGetMoreDevices from '../devices/hooks/useGetMoreDevices';

function HomeView() {
  const containerRef = useRef(null);
  const { isLoading, items } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();

  return (
    <>
      <HeaderView />

      <DeviceListContainer ref={containerRef}>
        <CategoriesListView />

        <DeviceListView
          containerRef={containerRef}
          isLoading={isLoading}
          items={items}
          fetchMore={fetchMore}
          isLoadingMore={isLoadingMore}
        />
      </DeviceListContainer>
    </>
  );
}

export default HomeView;
