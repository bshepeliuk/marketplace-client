import React from 'react';
import Pagination from '@common/components/Pagination/Pagination';
import OrdersAccordion from '../components/OrderAccordion/OrderAccordion';
import useServeOrdersPagination from '../hooks/useServeOrdersPagination';
import { ORDERS_LIMIT } from '../constants';
import OrderSearchView from '../components/Filters/OrderSearchView';
import OrderStatusFilterView from '../components/Filters/OrderStatusFilterView';
import { Container, FilterWrapper } from '../styles/orders.styled';
import SorterView from '../components/Filters/SorterView';

type SorterListType = Array<{ label: string; fieldName: 'fullName' | 'createdAt' }>;

const sortOptions: SorterListType = [
  { label: 'created at', fieldName: 'createdAt' },
  { label: 'customer', fieldName: 'fullName' },
];

function OrdersView() {
  const { items, isLoading, total, shouldHavePagination, currentPage, onPageChange } = useServeOrdersPagination();

  return (
    <Container>
      <FilterWrapper>
        <OrderSearchView />
        <OrderStatusFilterView />
        <SorterView options={sortOptions} />
      </FilterWrapper>

      <OrdersAccordion isStatusChangeable items={items} isLoading={isLoading} />

      {shouldHavePagination && (
        <Pagination
          totalCount={total ?? 0}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageSize={ORDERS_LIMIT}
        />
      )}
    </Container>
  );
}

export default OrdersView;
