import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FIRST_ORDER_PAGINATION_PAGE, ORDERS_LIMIT } from '../constants';
import useFetchOrders from './useFetchOrders';

const useServeOrdersPagination = () => {
  const [currentPage, setCurrentPage] = useState(FIRST_ORDER_PAGINATION_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, isLoading, total, fetchOrders, notFound } = useFetchOrders();

  const shouldHavePagination = total !== null && total > ORDERS_LIMIT;

  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_ORDER_PAGINATION_PAGE ? (pageParam - FIRST_ORDER_PAGINATION_PAGE) * ORDERS_LIMIT : 0;

  const filters = [...searchParams.entries()].filter(([key]) => key !== 'page');

  useEffect(() => {
    fetchOrders({ offset, filters, limit: ORDERS_LIMIT });
  }, []);

  const onPageChange = (page: number) => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    fetchOrders({ filters, limit: ORDERS_LIMIT, offset: (page - FIRST_ORDER_PAGINATION_PAGE) * ORDERS_LIMIT });

    searchParams.set('page', String(page));

    setSearchParams(searchParams);
    setCurrentPage(page);
  };

  return {
    notFound,
    currentPage,
    items,
    isLoading,
    total,
    onPageChange,
    shouldHavePagination,
  };
};

export default useServeOrdersPagination;
