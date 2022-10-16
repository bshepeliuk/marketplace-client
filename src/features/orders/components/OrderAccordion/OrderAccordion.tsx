import React from 'react';

import { Wrapper } from '../../styles/ordersAccordion.styled';
import { IOrder, IOrderDevice } from '../../types';
import OrderAccordionLoader from '../OrderAccordionLoader/OrderAccordionLoader';
import OrderAccordionItem from './components/OrderAccordionItem';

interface IProps {
  items: Array<[Omit<IOrder, 'devices'>, IOrderDevice[]]>;
  isLoading: boolean;
  isStatusChangeable?: boolean;
}

function OrdersAccordion({ items, isLoading, isStatusChangeable = false }: IProps) {
  if (isLoading) return <OrderAccordionLoader />;

  return (
    <Wrapper>
      {items.map(([order, devices]) => {
        return (
          <OrderAccordionItem isStatusChangeable={isStatusChangeable} key={order.id} order={order} devices={devices} />
        );
      })}
    </Wrapper>
  );
}

export default OrdersAccordion;
