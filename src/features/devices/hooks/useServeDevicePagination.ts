import usePrevious from '@src/common/hooks/usePrevious';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEVICES_LIMIT } from '../constants';
import { devicesSelector } from '../selectors/deviceSelector';
import useFetchDevicesByRequest from './useFetchDevicesByRequest';

const useServeDevicePagination = () => {
  const FIRST_PAGE = 1;

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchParams = usePrevious(searchParams.toString());
  const fetchDevices = useFetchDevicesByRequest();
  const { items, isLoading, isError, total } = useTypedSelector((state) => {
    return devicesSelector(state, searchParams.get('categoryId'));
  });

  const shouldHavePagination = total > DEVICES_LIMIT;

  const categoryId = searchParams.get('categoryId');
  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * DEVICES_LIMIT : 0;

  const currentSearchParams = searchParams.toString();

  const hasRemovedFilterParams = prevSearchParams && prevSearchParams.length > currentSearchParams.length;

  useEffect(() => {
    if (hasRemovedFilterParams) fetchDevices({ limit: DEVICES_LIMIT, offset });
  }, [currentSearchParams]);

  useEffect(() => {
    fetchDevices({ offset, limit: DEVICES_LIMIT });
  }, [categoryId]);

  const onPageChange = (page: number) => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    fetchDevices({ limit: DEVICES_LIMIT, offset: (page - FIRST_PAGE) * DEVICES_LIMIT });

    searchParams.set('page', String(page));
    setSearchParams(searchParams);

    setCurrentPage(page);
  };

  return {
    currentPage,
    items,
    isLoading,
    isError,
    total,
    onPageChange,
    shouldHavePagination,
  };
};

export default useServeDevicePagination;
