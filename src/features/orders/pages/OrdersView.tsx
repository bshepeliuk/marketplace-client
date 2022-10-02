import React from 'react';
import styled from 'styled-components';
import Pagination from '@common/components/Pagination/Pagination';
import OrdersAccordion from '../components/OrderAccordion/OrderAccordion';
import useServeOrdersPagination from '../hooks/useServeOrdersPagination';
import { ORDERS_LIMIT } from '../constants';

import OrderSearchView from '../components/Filters/OrderSearchView';
import OrderStatusFilterView from '../components/Filters/OrderStatusFilterView';

function OrdersView() {
  const { items, isLoading, total, shouldHavePagination, currentPage, onPageChange } = useServeOrdersPagination();

  return (
    <Container>
      <Wrapper>
        <OrderSearchView />
        <OrderStatusFilterView />
      </Wrapper>

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

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  margin: 0 10px 20px 10px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  overflow-x: auto;
`;

export default OrdersView;
