import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import useFetchPurchases from './useFetchPurchases';
import { PURCHASES_FIRST_PAGE } from '../constants';

const useServePurchasesPagination = () => {
  const [currentPage, setCurrentPage] = useState(PURCHASES_FIRST_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, isLoading, total, fetchPurchases, notFound } = useFetchPurchases();

  const shouldHavePagination = total !== null && total > ORDERS_LIMIT;

  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > PURCHASES_FIRST_PAGE ? (pageParam - PURCHASES_FIRST_PAGE) * ORDERS_LIMIT : 0;

  const filters = [...searchParams.entries()].filter(([key]) => key !== 'page');

  useEffect(() => {
    fetchPurchases({ offset, filters, limit: ORDERS_LIMIT });
  }, []);

  useEffect(() => {
    if (searchParams.get('page') === null) {
      setCurrentPage(PURCHASES_FIRST_PAGE);
    }
  }, [searchParams.toString()]);

  const onPageChange = (page: number) => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    fetchPurchases({ filters, limit: ORDERS_LIMIT, offset: (page - PURCHASES_FIRST_PAGE) * ORDERS_LIMIT });

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

export default useServePurchasesPagination;
