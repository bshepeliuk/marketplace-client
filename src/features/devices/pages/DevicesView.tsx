/* eslint-disable max-len */
import React, { useRef } from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
import getActiveSearchParamsEntries from '@features/filters/helpers/getActiveSearchParamsEntries';
import FilterSideBarView from '@src/features/filters/components/FilterSideBar';
import { useSearchParams } from 'react-router-dom';
import ActiveFilterListView from '@features/filters/components/ActiveFilterList/ActiveFilterListView';
import DeviceListView from '../components/DeviceListView';
import { DeviceListContainer, Wrapper } from '../styles/deviceView.styled';
import useGetMoreDevices from '../hooks/useGetMoreDevices';
import useGetDevices from '../hooks/useGetDevices';

function DevicesView() {
  const containerRef = useRef<any>(null);
  const { items, isLoading } = useGetDevices();
  const { isLoadingMore, fetchMore } = useGetMoreDevices();
  const [searchParams] = useSearchParams();

  const activeFilters = getActiveSearchParamsEntries(searchParams);
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <>
      <HeaderView />

      <Wrapper>
        {hasActiveFilters && <ActiveFilterListView />}

        <FilterSideBarView />

        <DeviceListContainer ref={containerRef}>
          <DeviceListView
            containerRef={containerRef}
            items={items}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            fetchMore={fetchMore}
          />
        </DeviceListContainer>
      </Wrapper>
    </>
  );
}

export default DevicesView;
