import React from 'react';
import styled from 'styled-components';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import { Orders } from '@src/common/api/Api';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import OrderSearchView from '../atoms/OrderSearchView';
import SorterView from '../../../common/atoms/Sorter/SorterView';
import { ORDERS_LIMIT, searchOrderOptions } from '../constants';
import useFetchOrders from '../hooks/useFetchOrders';
import { searchOrderErrors, searchOrderValidation } from './helpers/searchFilterOrderValidation';
import OrderStatusSelector from '../atoms/OrderStatusSelector';
import OrderYearSelector from '../atoms/OrderYearSelector';

type SorterListType = Array<{ label: string; fieldName: 'fullName' | 'createdAt' }>;

function OrdersFilter() {
  const [searchParams] = useSearchParams();
  const { fetchOrders } = useFetchOrders();

  const onFilterChange = (filters: ParamKeyValuePair[]) => {
    const FIRST_PAGE = 1;
    const pageParam = Number(searchParams.get('page'));
    const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;

    fetchOrders({
      offset,
      filters,
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
        <OrderYearSelector onFilterChange={onFilterChange} onLoadYearOptions={onLoadYearOptions} />
      </InnerWrap>

      <InnerWrap>
        <OrderSearchView
          options={searchOrderOptions}
          onFilterChange={onFilterChange}
          validation={searchOrderValidation}
          errors={searchOrderErrors}
        />
        <OrderStatusSelector onFilterChange={onFilterChange} />
        <SorterView options={sortOptions} onFilterChange={onFilterChange} />
      </InnerWrap>
    </Wrap>
  );
}

const sortOptions: SorterListType = [
  { label: 'created at', fieldName: 'createdAt' },
  { label: 'customer', fieldName: 'fullName' },
];

const Wrap = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
`;

const InnerWrap = styled.div`
  display: flex;
  gap: 15px;
`;

export default OrdersFilter;
