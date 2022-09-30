import React from 'react';
import { Container, Wrapper } from '../../styles/ordersAccordion.styled';
import { IOrder, IOrderDevice } from '../../types';
import OrderAccordionItem from './components/OrderAccordionItem';

interface IProps {
  items: Array<[Omit<IOrder, 'devices'>, IOrderDevice[]]>;
  isLoading: boolean;
  isStatusChangeable?: boolean;
}

function OrdersAccordion({ items, isLoading, isStatusChangeable = false }: IProps) {
  if (isLoading) return <div>isLoading...</div>;

  return (
    <Container>
      <Wrapper>
        {items.map(([order, devices]) => {
          return (
            <OrderAccordionItem
              isStatusChangeable={isStatusChangeable}
              key={order.id}
              order={order}
              devices={devices}
            />
          );
        })}
      </Wrapper>
    </Container>
  );
}

export default OrdersAccordion;
