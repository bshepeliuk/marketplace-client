import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Orders } from '@common/api/Api';
import MonthFilter from '@common/components/MonthFilter/MonthFilter';
import YearSelector from '@common/components/YearSelector/YearSelector';
import getNextSearchParams from '@common/utils/getNextSearchParams';
import { Nullable } from '@src/common/types/baseTypes';
import convertFiltersToParamKeyValuePair from '@common/utils/convertFiltersToParamKeyValuePair';
import SorterView, { SortDirectionValues, SorterInitValues } from '@common/atoms/Sorter/SorterView';
import OrderSearchView from '../atoms/OrderSearchView';
import { ORDERS_LIMIT, SEARCH_ORDER_OPTIONS, SORT_ORDER_OPTIONS } from '../constants';
import useFetchOrders from '../hooks/useFetchOrders';
import { searchOrderErrors, searchOrderValidation } from '../helpers/searchFilterOrderValidation';
import OrderStatusSelector from '../atoms/OrderStatusSelector';
import { InnerWrap, Wrap } from '../styles/ordersFilter.styled';

type Filters = Record<string, string | number | string[] | number[]>;

function OrdersFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchOrders } = useFetchOrders();

  const initialStatusValues = Array.from(searchParams.getAll('status').values());
  const initialSorterValue: SorterInitValues = {
    sortField: searchParams.get('sortField'),
    sortDirection: searchParams.get('sortDirection') as Nullable<SortDirectionValues>,
  };
  const initialMonthValues = Array.from(searchParams.getAll('month').values()).map(Number);
  const initialYearValue = searchParams.get('year');
  const initialSearchValue = SEARCH_ORDER_OPTIONS.reduce((prev, current) => {
    const value = searchParams.get(current.fieldName);
    return value !== null ? [current.fieldName, value] : prev;
  }, [] as string[]);

  const onLoadYearOptions = () => {
    return Orders.getYearOptions().then((res) => res.data.options);
  };

  const onFilterChange = (filters: Filters) => {
    searchParams.delete('page');

    const prevParams = Array.from(searchParams.entries());
    const newParams = convertFiltersToParamKeyValuePair(filters);
    const nextParams = getNextSearchParams({ prev: prevParams, next: newParams });

    setSearchParams(nextParams);
    fetchOrders({
      offset: 0,
      filters: nextParams,
      limit: ORDERS_LIMIT,
    });
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
          options={SEARCH_ORDER_OPTIONS}
          onFilterChange={onFilterChange}
          validation={searchOrderValidation}
          errors={searchOrderErrors}
          initialValue={initialSearchValue}
        />
        <OrderStatusSelector onFilterChange={onFilterChange} initialValues={initialStatusValues} />
        <SorterView options={SORT_ORDER_OPTIONS} onFilterChange={onFilterChange} initialValue={initialSorterValue} />
      </InnerWrap>
    </Wrap>
  );
}

export default OrdersFilter;
