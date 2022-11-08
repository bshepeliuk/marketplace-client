import React from 'react';
import { ParamKeyValuePair } from 'react-router-dom';
import { Orders } from '@src/common/api/Api';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import YearSelector from '@src/common/components/YearSelector/YearSelector';
import OrderSearchView from '../atoms/OrderSearchView';
import SorterView from '../../../common/atoms/Sorter/SorterView';
import { ORDERS_LIMIT, SEARCH_ORDER_OPTIONS, SORT_ORDER_OPTIONS } from '../constants';
import useFetchOrders from '../hooks/useFetchOrders';
import { searchOrderErrors, searchOrderValidation } from '../helpers/searchFilterOrderValidation';
import OrderStatusSelector from '../atoms/OrderStatusSelector';
import { InnerWrap, Wrap } from '../styles/ordersFilter.styled';

function OrdersFilter() {
  const { fetchOrders } = useFetchOrders();

  const onFilterChange = (filters: ParamKeyValuePair[]) => {
    fetchOrders({
      filters,
      offset: 0,
      limit: ORDERS_LIMIT,
    });
  };

  const onLoadYearOptions = () => {
    return Orders.getYearOptions().then((res) => res.data.options);
  };

  return (
    <Wrap>
      <InnerWrap>
        <MonthFilter onFilterChange={onFilterChange} />
        <YearSelector onFilterChange={onFilterChange} onLoadYearOptions={onLoadYearOptions} />
      </InnerWrap>

      <InnerWrap>
        <OrderSearchView
          options={SEARCH_ORDER_OPTIONS}
          onFilterChange={onFilterChange}
          validation={searchOrderValidation}
          errors={searchOrderErrors}
        />
        <OrderStatusSelector onFilterChange={onFilterChange} />
        <SorterView options={SORT_ORDER_OPTIONS} onFilterChange={onFilterChange} />
      </InnerWrap>
    </Wrap>
  );
}

export default OrdersFilter;
