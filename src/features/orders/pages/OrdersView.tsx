import React from 'react';

import Pagination from '@common/components/Pagination/Pagination';
import useSlowDownLoaderIndicator from '@src/common/hooks/useSlowDownLoaderIndicator';
import OrdersAccordion from '../components/OrderAccordion/OrderAccordion';
import useServeOrdersPagination from '../hooks/useServeOrdersPagination';
import { ORDERS_LIMIT } from '../constants';
import { Container, FilterWrapper, PaginationContainer } from '../styles/orders.styled';
import OrdersFilter from '../components/OrdersFilter';

function OrdersView() {
  // prettier-ignore
  const {
    items,
    notFound,
    isLoading,
    total,
    shouldHavePagination,
    currentPage,
    onPageChange
  } = useServeOrdersPagination();
  const isSlowLoading = useSlowDownLoaderIndicator({ isLoading, duration: 500 });

  const isLoaded = !isSlowLoading;
  const hasPagination = shouldHavePagination && !isSlowLoading;

  return (
    <Container>
      <FilterWrapper>
        <OrdersFilter />
      </FilterWrapper>

      {notFound && isLoaded && <div>Not Found!</div>}

      <OrdersAccordion isStatusChangeable items={items} isLoading={isSlowLoading} />

      {hasPagination && (
        <PaginationContainer>
          <Pagination
            totalCount={total ?? 0}
            currentPage={currentPage}
            onPageChange={onPageChange}
            pageSize={ORDERS_LIMIT}
          />
        </PaginationContainer>
      )}
    </Container>
  );
}

export default OrdersView;
