import React from 'react';
import styled from 'styled-components';
import OrdersAccordion from '@features/orders/components/OrderAccordion/OrderAccordion';
import Pagination from '@src/common/components/Pagination/Pagination';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import useServePurchasesPagination from '../hooks/useServePurchasesPagination';
import PurchasesFilter from '../components/PurchasesFilter';

function PurchasesView() {
  const { items, isLoading, total, shouldHavePagination, currentPage, onPageChange } = useServePurchasesPagination();

  return (
    <Container>
      <FilterWrapper>
        <PurchasesFilter />
      </FilterWrapper>

      <OrdersAccordion items={items} isLoading={isLoading} />

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

const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  overflow-x: auto;
  min-height: calc(var(--default-height) - 40px); // margin top and bottom
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin: 0 10px 20px 10px;
`;

export default PurchasesView;
