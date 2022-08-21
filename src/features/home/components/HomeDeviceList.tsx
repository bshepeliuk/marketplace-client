import React, { MutableRefObject } from 'react';
import useGetDevices from '@src/features/devices/hooks/useGetDevices';
import useGetMoreDevices from '@src/features/devices/hooks/useGetMoreDevices';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import ErrorMessageView from '@common/components/ErrorMessageView';
import DeviceListView from '@src/features/devices/components/DeviceListView';
import NoDevicesView from '@src/features/devices/components/NoDevicesView';

interface IProps {
  containerRef: MutableRefObject<HTMLElement | null>;
}

function HomeDeviceList({ containerRef }: IProps) {
  const { isLoading, isError, items } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();
  const hasNoDevices = useTypedSelector((state) => state.devices.hasNoDevices);

  if (isError) return <ErrorMessageView />;

  return (
    <>
      <DeviceListView
        containerRef={containerRef}
        isLoading={isLoading}
        items={items}
        fetchMore={fetchMore}
        isLoadingMore={isLoadingMore}
      />

      {hasNoDevices && <NoDevicesView />}
    </>
  );
}

export default HomeDeviceList;
