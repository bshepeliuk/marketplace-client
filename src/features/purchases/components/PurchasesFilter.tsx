import React from 'react';
import { ParamKeyValuePair } from 'react-router-dom';
import styled from 'styled-components';

import { ORDERS_LIMIT } from '@src/features/orders/constants';
import { searchOrderErrors, searchOrderValidation } from '@src/features/orders/helpers/searchFilterOrderValidation';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import YearSelector from '@src/common/components/YearSelector/YearSelector';
import OrderSearchView from '@src/features/orders/atoms/OrderSearchView';
import OrderStatusSelector from '@src/features/orders/atoms/OrderStatusSelector';
import { Purchases } from '@src/common/api/Api';
import SorterView from '@src/common/atoms/Sorter/SorterView';
import useFetchPurchases from '../hooks/useFetchPurchases';
import { PURCHASES_SEARCH_OPTIONS, PURCHASES_SORT_OPTIONS } from '../constants';

function PurchasesFilter() {
  const { fetchPurchases } = useFetchPurchases();

  const onFilterChange = (filters: ParamKeyValuePair[]) => {
    fetchPurchases({
      filters,
      offset: 0,
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
        <YearSelector onFilterChange={onFilterChange} onLoadYearOptions={onLoadYearOptions} />
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
