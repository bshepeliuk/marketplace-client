/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
import getActiveSearchParamsEntries from '@features/filters/helpers/getActiveSearchParamsEntries';
import FilterSideBarView from '@src/features/filters/components/FilterSideBar';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ActiveFilterListView from '@features/filters/components/ActiveFilterList/ActiveFilterListView';
import { routes } from '@src/app/Router';
import DeviceListView from '../components/DeviceListView';
import { DeviceListContainer, Wrapper } from '../styles/deviceView.styled';
import useGetMoreDevices from '../hooks/useGetMoreDevices';
import useGetDevices from '../hooks/useGetDevices';

function DevicesView() {
  const containerRef = useRef<any>(null);
  const { items, isLoading } = useGetDevices();
  const { isLoadingMore, fetchMore } = useGetMoreDevices();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const activeFilters = getActiveSearchParamsEntries(searchParams);
  const hasActiveFilters = activeFilters.length > 0;

  useEffect(() => {
    if (location.pathname === routes.devices && location.search === '') {
      navigate('/');
    }
  }, [location.pathname]);

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
