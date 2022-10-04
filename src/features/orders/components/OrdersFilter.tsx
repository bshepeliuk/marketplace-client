import React from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import OrderSearchView from '../atoms/OrderSearchView';
import OrderStatusFilterView from '../atoms/OrderStatusFilterView';
import SorterView from '../../../common/atoms/Sorter/SorterView';
import { ORDERS_LIMIT } from '../constants';
import useFetchOrders from '../hooks/useFetchOrders';

type SorterListType = Array<{ label: string; fieldName: 'fullName' | 'createdAt' }>;

const sortOptions: SorterListType = [
  { label: 'created at', fieldName: 'createdAt' },
  { label: 'customer', fieldName: 'fullName' },
];

function OrdersFilter() {
  const [searchParams] = useSearchParams();
  const { fetchOrders } = useFetchOrders();

  const onFilterChange = (filters: ParamKeyValuePair[]) => {
    const FIRST_PAGE = 1;
    const pageParam = Number(searchParams.get('page'));
    const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

    fetchOrders({
      offset,
      filters,
      limit: ORDERS_LIMIT,
    });
  };

  return (
    <>
      <OrderSearchView onFilterChange={onFilterChange} />
      <OrderStatusFilterView onFilterChange={onFilterChange} />
      <SorterView options={sortOptions} onFilterChange={onFilterChange} />
    </>
  );
}

export default OrdersFilter;
