import React from 'react';
import Pagination from '@common/components/Pagination/Pagination';
import OrdersAccordion from '../components/OrderAccordion/OrderAccordion';
import useServeOrdersPagination from '../hooks/useServeOrdersPagination';
import { ORDERS_LIMIT } from '../constants';
import { Container, FilterWrapper } from '../styles/orders.styled';
import OrdersFilter from '../components/OrdersFilter';

function OrdersView() {
  const { items, isLoading, total, shouldHavePagination, currentPage, onPageChange } = useServeOrdersPagination();

  return (
    <Container>
      <FilterWrapper>
        <OrdersFilter />
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
