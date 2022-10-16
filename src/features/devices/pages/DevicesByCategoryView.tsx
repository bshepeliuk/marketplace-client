import React, { useEffect } from 'react';
import FilterSideBarView from '@src/features/filters/components/FilterSideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessageView from '@common/components/ErrorMessageView';
import ActiveFilterListView from '@features/filters/components/ActiveFilterList/ActiveFilterListView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import Pagination from '@common/components/Pagination/Pagination';
import FilterBurgerMenu from '@common/components/FilterBurgerMenu/FilterBurgerMenu';
import {
  PaginationContainer,
  Container,
  ActiveFilterContainer,
  SideBarWrap,
  FilterBurgerMenuContainer,
} from '../styles/devicesByCategory.styled';
import NoDevicesView from '../components/NoDevicesView';
import { DEVICES_LIMIT } from '../constants';
import DevicesByCategoryList from '../components/DevicesByCategoryList/DevicesByCategoryList';
import useServeDevicePagination from '../hooks/useServeDevicePagination';
import useHandleDeviceByCategoryResize from '../hooks/useHandleDeviceByCategoryResize';

function DevicesByCategoryView() {
  const { isLessThanLargeScreen, isLargeScreen } = useHandleDeviceByCategoryResize();
  // prettier-ignore
  const {
    items,
    total,
    isLoading,
    isError,
    shouldHavePagination,
    onPageChange,
    currentPage
  } = useServeDevicePagination();
  const location = useLocation();
  const navigate = useNavigate();
  const hasNoDevices = useTypedSelector((state) => state.devices.hasNoDevices);

  const hasNoSearchParams = location.pathname === routes.devices && location.search === '';

  useEffect(() => {
    if (hasNoSearchParams) navigate(routes.home);
  }, [location.pathname]);

  if (hasNoDevices) return <NoDevicesView />;
  if (isError) return <ErrorMessageView />;

  return (
    <>
      {isLessThanLargeScreen && (
        <FilterBurgerMenuContainer>
          <FilterBurgerMenu />
        </FilterBurgerMenuContainer>
      )}

      <ActiveFilterContainer>
        <ActiveFilterListView />
      </ActiveFilterContainer>

      <Container>
        {isLargeScreen && (
          <SideBarWrap>
            <FilterSideBarView />
          </SideBarWrap>
        )}

        <DevicesByCategoryList items={items} isLoading={isLoading} />

        {shouldHavePagination && (
          <PaginationContainer>
            <Pagination
              pageSize={DEVICES_LIMIT}
              totalCount={total}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </PaginationContainer>
        )}
      </Container>
    </>
  );
}

export default DevicesByCategoryView;
