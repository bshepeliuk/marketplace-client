import React from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { ORDERS_LIMIT } from '@src/features/orders/constants';
import {
  searchOrderErrors,
  searchOrderValidation,
} from '@src/features/orders/components/helpers/searchFilterOrderValidation';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import OrderYearSelector from '@src/features/orders/atoms/OrderYearSelector';
import OrderSearchView from '@src/features/orders/atoms/OrderSearchView';
import OrderStatusSelector from '@src/features/orders/atoms/OrderStatusSelector';
import { Purchases } from '@src/common/api/Api';
import SorterView from '@src/common/atoms/Sorter/SorterView';
import useFetchPurchases from '../hooks/useFetchPurchases';
import { PURCHASES_SEARCH_OPTIONS, PURCHASES_SORT_OPTIONS } from '../constants';

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

  const onLoadYearOptions = () => {
    return Purchases.getYearOptions().then((res) => res.data.options);
  };

  return (
    <Wrap>
      <InnerWrap>
        <MonthFilter onFilterChange={onFilterChange} />
        <OrderYearSelector onFilterChange={onFilterChange} onLoadYearOptions={onLoadYearOptions} />
      </InnerWrap>

      <InnerWrap>
        <OrderSearchView
          options={PURCHASES_SEARCH_OPTIONS}
          onFilterChange={onFilterChange}
          validation={searchOrderValidation}
          errors={searchOrderErrors}
        />
        <OrderStatusSelector onFilterChange={onFilterChange} />
        <SorterView options={PURCHASES_SORT_OPTIONS} onFilterChange={onFilterChange} />
      </InnerWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
`;

const InnerWrap = styled.div`
  display: flex;
  gap: 15px;
`;

export default PurchasesFilter;
