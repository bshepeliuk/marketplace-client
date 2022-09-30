import React, { useState } from 'react';
import { IOrder, IOrderDevice } from '@src/features/purchases/types';
import { Wrapper } from '@src/features/orders/styles/ordersAccordion.styled';
import OrderAccordionBody from './OrderAccordionBody';
import OrderAccordionHeader from './OrderAccordionHeader';

interface IOrderItemProps {
  order: Omit<IOrder, 'devices'>;
  devices: IOrderDevice[];
  isStatusChangeable: boolean;
}

function OrderAccordionItem({ order, devices, isStatusChangeable }: IOrderItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Wrapper>
      <OrderAccordionHeader isOpen={isOpen} toggleOpen={toggleOpen} order={order} />
      <OrderAccordionBody isStatusChangeable={isStatusChangeable} isOpen={isOpen} devices={devices} />
    </Wrapper>
  );
}

export default OrderAccordionItem;
