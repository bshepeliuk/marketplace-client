import React, { useEffect, useRef } from 'react';
import DeviceListView from '@features/devices/components/DeviceListView';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { devicesSelector } from '@src/features/devices/selectors/deviceSelector';
import useGetMoreDevices from '@src/features/devices/hooks/useGetMoreDevices';
import useFetchDevicesByRequest from '@features/devices/hooks/useFetchDevicesByRequest';
import { RootState } from '@src/app/store';
import { FoundListContainer } from '../styles/SearchResult.styled';

function SearchResultView() {
  const [params] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchDevices = useFetchDevicesByRequest();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();

  const selector = (state: RootState) => devicesSelector(state, null);
  const { items, isLoading, hasNoDevices } = useTypedSelector(selector);

  const searchNameValue = params.get('name');

  useEffect(() => {
    fetchDevices();
  }, [searchNameValue]);

  return (
    <>
      <HeaderView />

      {hasNoDevices ? (
        <div>Not found.</div>
      ) : (
        <FoundListContainer ref={containerRef}>
          <DeviceListView
            containerRef={containerRef}
            items={items}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            fetchMore={fetchMore}
          />
        </FoundListContainer>
      )}
    </>
  );
}

export default SearchResultView;
