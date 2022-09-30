import React from 'react';
import OrdersAccordion from '@features/orders/components/OrderAccordion/OrderAccordion';
import Pagination from '@src/common/components/Pagination/Pagination';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import useServePurchasesPagination from '../hooks/useServePurchasesPagination';

function PurchasesView() {
  const { items, isLoading, total, shouldHavePagination, currentPage, onPageChange } = useServePurchasesPagination();

  return (
    <>
      <OrdersAccordion items={items} isLoading={isLoading} />

      {shouldHavePagination && (
        <Pagination
          totalCount={total ?? 0}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageSize={ORDERS_LIMIT}
        />
      )}
    </>
  );
}

export default PurchasesView;
