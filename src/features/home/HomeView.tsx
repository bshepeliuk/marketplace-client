import React, { useRef } from 'react';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import ErrorMessageView from '@common/components/ErrorMessageView';
import DeviceListView from '../devices/components/DeviceListView';
import { DeviceListContainer } from './home.styled';
import CategoriesListView from '../categories/components/CategoriesListView';
import useGetDevices from '../devices/hooks/useGetDevices';
import useGetMoreDevices from '../devices/hooks/useGetMoreDevices';
import NoDevicesView from '../devices/components/NoDevicesView';

function HomeView() {
  const containerRef = useRef(null);
  const { isLoading, isError, items } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();
  const hasNoDevices = useTypedSelector((state) => state.devices.hasNoDevices);

  if (isError) return <ErrorMessageView />;

  return (
    <DeviceListContainer ref={containerRef}>
      <CategoriesListView />

      <DeviceListView
        containerRef={containerRef}
        isLoading={isLoading}
        items={items}
        fetchMore={fetchMore}
        isLoadingMore={isLoadingMore}
      />

      {hasNoDevices && <NoDevicesView />}
    </DeviceListContainer>
  );
}

export default HomeView;
