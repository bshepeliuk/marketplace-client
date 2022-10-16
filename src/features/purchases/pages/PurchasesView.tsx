import React from 'react';
import OrdersAccordion from '@features/orders/components/OrderAccordion/OrderAccordion';
import Pagination from '@src/common/components/Pagination/Pagination';
import useSlowDownLoaderIndicator from '@src/common/hooks/useSlowDownLoaderIndicator';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import useServePurchasesPagination from '../hooks/useServePurchasesPagination';
import PurchasesFilter from '../components/PurchasesFilter';
import { Container, FilterWrapper, PaginationContainer, NotFoundContainer } from '../styles/purchases.styled';

function PurchasesView() {
  // prettier-ignore
  const {
    items,
    isLoading,
    total,
    shouldHavePagination,
    currentPage,
    onPageChange,
    notFound
  } = useServePurchasesPagination();
  const isSlowLoading = useSlowDownLoaderIndicator({ isLoading, duration: 500 });

  const isLoaded = !isSlowLoading;
  const hasPagination = shouldHavePagination && !isSlowLoading;

  return (
    <Container>
      <FilterWrapper>
        <PurchasesFilter />
      </FilterWrapper>

      {notFound && isLoaded && <NotFoundContainer>Not Found!</NotFoundContainer>}

      <OrdersAccordion items={items} isLoading={isSlowLoading} />

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

export default PurchasesView;
