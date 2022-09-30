import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORDERS_LIMIT } from '../constants';
import useGetOrders from './useGetOrders';

const useServeOrdersPagination = () => {
  const FIRST_PAGE = 1;

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, isLoading, total, fetchOrders } = useGetOrders();

  const shouldHavePagination = total && total > ORDERS_LIMIT;

  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

  useEffect(() => {
    fetchOrders({ offset, limit: ORDERS_LIMIT });
  }, []);

  const onPageChange = (page: number) => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    fetchOrders({ limit: ORDERS_LIMIT, offset: (page - FIRST_PAGE) * ORDERS_LIMIT });

    searchParams.set('page', String(page));
    setSearchParams(searchParams);

    setCurrentPage(page);
  };

  return {
    currentPage,
    items,
    isLoading,
    total,
    onPageChange,
    shouldHavePagination,
  };
};

export default useServeOrdersPagination;
