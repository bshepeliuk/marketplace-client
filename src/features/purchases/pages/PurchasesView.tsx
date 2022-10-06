import React from 'react';
import styled from 'styled-components';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import OrderSearchView from '@src/features/orders/atoms/OrderSearchView';
import OrderStatusFilterView from '@src/features/orders/atoms/OrderStatusFilterView';
import createOption from '@src/common/utils/createSelectOption';
import SorterView from '@src/common/atoms/Sorter/SorterView';
import OrdersAccordion from '@features/orders/components/OrderAccordion/OrderAccordion';
import Pagination from '@src/common/components/Pagination/Pagination';
import { ORDERS_LIMIT } from '@src/features/orders/constants';
import useServePurchasesPagination from '../hooks/useServePurchasesPagination';
import useFetchPurchases from '../hooks/useFetchPurchases';
import {
  searchOrderErrors,
  searchOrderValidation,
} from '@src/features/orders/components/helpers/searchFilterOrderValidation';

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

type SorterListType = Array<{ label: string; fieldName: 'fullName' | 'createdAt' }>;

const sortOptions: SorterListType = [
  { label: 'created at', fieldName: 'createdAt' },
  { label: 'customer', fieldName: 'fullName' },
];

const searchPurchaseOptions = [
  { ...createOption('Order id'), fieldName: 'id' },
  { ...createOption('Device name'), fieldName: 'deviceName' },
];

function PurchasesFilter() {
  const [searchParams] = useSearchParams();
  const { fetchPurchases } = useFetchPurchases();

  const onFilterChange = (filters: ParamKeyValuePair[]) => {
    const FIRST_PAGE = 1;
    const pageParam = Number(searchParams.get('page'));
    const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

    fetchPurchases({
      offset,
      filters,
      limit: ORDERS_LIMIT,
    });
  };

  return (
    <>
      <OrderSearchView
        options={searchPurchaseOptions}
        onFilterChange={onFilterChange}
        validation={searchOrderValidation}
        errors={searchOrderErrors}
      />
      <OrderStatusFilterView onFilterChange={onFilterChange} />
      <SorterView options={sortOptions} onFilterChange={onFilterChange} />
    </>
  );
}

export default PurchasesView;
