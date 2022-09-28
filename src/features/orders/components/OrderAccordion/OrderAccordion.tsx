import React from 'react';
import useGetOrders from '../../hooks/useGetOrders';
import { Container, Wrapper } from '../../styles/ordersAccordion.styled';
import OrderAccordionItem from './components/OrderAccordionItem';

function OrdersAccordion() {
  const { items, isLoading } = useGetOrders();

  if (isLoading) return <div>isLoading...</div>;

  return (
    <Container>
      <Wrapper>
        {items.map(([order, devices]) => {
          return <OrderAccordionItem key={order.id} order={order} devices={devices} />;
        })}
      </Wrapper>
    </Container>
  );
}

export default OrdersAccordion;
