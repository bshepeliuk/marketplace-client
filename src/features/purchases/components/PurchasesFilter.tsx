import React from 'react';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { ORDERS_LIMIT } from '@src/features/orders/constants';
import { searchOrderErrors, searchOrderValidation } from '@src/features/orders/helpers/searchFilterOrderValidation';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import convertFiltersToParamKeyValuePair from '@src/common/utils/convertFiltersToParamKeyValuePair';
import getNextSearchParams from '@src/common/utils/getNextSearchParams';
import YearSelector from '@src/common/components/YearSelector/YearSelector';
import OrderSearchView from '@src/features/orders/atoms/OrderSearchView';
import OrderStatusSelector from '@src/features/orders/atoms/OrderStatusSelector';
import { Nullable } from '@src/common/types/baseTypes';
import { Purchases } from '@src/common/api/Api';
import SorterView, { SortDirectionValues, SorterInitValues } from '@src/common/atoms/Sorter/SorterView';
import useFetchPurchases from '../hooks/useFetchPurchases';
import { PURCHASES_SEARCH_OPTIONS, PURCHASES_SORT_OPTIONS } from '../constants';

type Filters = Record<string, string | number | string[] | number[]>;

function PurchasesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchPurchases } = useFetchPurchases();

  const initialStatusValues = Array.from(searchParams.getAll('status').values());
  const initialMonthValues = Array.from(searchParams.getAll('month').values()).map(Number);
  const initialYearValue = searchParams.get('year');
  const initialSearchValue = PURCHASES_SEARCH_OPTIONS.reduce((prev, current) => {
    const value = searchParams.get(current.fieldName);
    return value !== null ? [current.fieldName, value] : prev;
  }, [] as string[]);
  const initialSorterValue: SorterInitValues = {
    sortField: searchParams.get('sortField'),
    sortDirection: searchParams.get('sortDirection') as Nullable<SortDirectionValues>,
  };

  const onFilterChange = (filters: Filters) => {
    searchParams.delete('page');

    const prevParams = Array.from(searchParams.entries());
    const newParams = convertFiltersToParamKeyValuePair(filters);
    const nextParams = getNextSearchParams({ prev: prevParams, next: newParams });

    setSearchParams(nextParams);
    fetchPurchases({
      offset: 0,
      filters: nextParams,
      limit: ORDERS_LIMIT,
    });
  };

  const onLoadYearOptions = () => {
    return Purchases.getYearOptions().then((res) => res.data.options);
  };

  return (
    <Wrap>
      <InnerWrap>
        <MonthFilter onFilterChange={onFilterChange} initialValues={initialMonthValues} />
        <YearSelector
          onFilterChange={onFilterChange}
          onLoadYearOptions={onLoadYearOptions}
          initialValue={initialYearValue}
        />
      </InnerWrap>

      <InnerWrap>
        <OrderSearchView
          options={PURCHASES_SEARCH_OPTIONS}
          onFilterChange={onFilterChange}
          validation={searchOrderValidation}
          errors={searchOrderErrors}
          initialValue={initialSearchValue}
        />
        <OrderStatusSelector onFilterChange={onFilterChange} initialValues={initialStatusValues} />
        <SorterView
          options={PURCHASES_SORT_OPTIONS}
          onFilterChange={onFilterChange}
          initialValue={initialSorterValue}
        />
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
