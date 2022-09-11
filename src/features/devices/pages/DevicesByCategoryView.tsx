import React, { useEffect, useState } from 'react';
import FilterSideBarView from '@src/features/filters/components/FilterSideBar';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorMessageView from '@common/components/ErrorMessageView';
import ActiveFilterListView from '@features/filters/components/ActiveFilterList/ActiveFilterListView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import Pagination from '@common/components/Pagination/Pagination';
import { RootState } from '@src/app/store';
import { PaginationContainer, Container } from '../styles/devicesByCategory.styled';
import NoDevicesView from '../components/NoDevicesView';
import { DEVICES_OFFSET } from '../constants';
import useFetchDevicesByRequest from '../hooks/useFetchDevicesByRequest';
import DevicesByCategoryList from '../components/DevicesByCategoryList/DevicesByCategoryList';
import { devicesSelector } from '../selectors/deviceSelector';

function DevicesByCategoryView() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId');

  const [currentPage, setCurrentPage] = useState(1);
  const fetchDevices = useFetchDevicesByRequest();
  const location = useLocation();
  const navigate = useNavigate();
  const hasNoDevices = useTypedSelector((state) => state.devices.hasNoDevices);
  const { items, isLoading, isError, total } = useTypedSelector((state: RootState) => {
    return devicesSelector(state, categoryId);
  });

  const hasNoSearchParams = location.pathname === routes.devices && location.search === '';
  const shouldHavePagination = total > DEVICES_OFFSET;

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const offset = page > 1 ? (page - 1) * DEVICES_OFFSET : 0;

    fetchDevices({ offset, limit: DEVICES_OFFSET });
  }, [categoryId]);

  useEffect(() => {
    if (hasNoSearchParams) navigate('/');
  }, [location.pathname]);

  const onPageChange = (page: number) => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    fetchDevices({ limit: DEVICES_OFFSET, offset: (page - 1) * DEVICES_OFFSET });

    searchParams.set('page', String(page));
    setSearchParams(searchParams);

    setCurrentPage(page);
  };

  if (hasNoDevices) return <NoDevicesView />;
  if (isError) return <ErrorMessageView />;

  return (
    <>
      <Container>
        <ActiveFilterListView />
      </Container>

      <Container>
        <FilterSideBarView />

        <DevicesByCategoryList items={items} isLoading={isLoading} />

        {shouldHavePagination && (
          <PaginationContainer>
            <Pagination
              pageSize={DEVICES_OFFSET}
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
