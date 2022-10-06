import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import useFetchPurchases from './useFetchPurchases';

const useServePurchasesPagination = () => {
  const FIRST_PAGE = 1;

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, isLoading, total, fetchPurchases } = useFetchPurchases();

  const shouldHavePagination = total !== null && total > ORDERS_LIMIT;

  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

  const filters = [...searchParams.entries()].filter(([key]) => key !== 'page');

  useEffect(() => {
    fetchPurchases({ offset, filters, limit: ORDERS_LIMIT });
  }, []);

  const onPageChange = (page: number) => {
    window.scrollTo({ behavior: 'smooth', top: 0 });

    fetchPurchases({ filters, limit: ORDERS_LIMIT, offset: (page - FIRST_PAGE) * ORDERS_LIMIT });

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

export default useServePurchasesPagination;
