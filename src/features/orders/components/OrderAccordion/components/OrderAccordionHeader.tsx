import React from 'react';
import { format } from 'date-fns';
import Copyable from '@src/common/components/Copyable/Copyable';
import { IOrder } from '@src/features/orders/types';
import {
  ArrowIcon,
  DateWrap,
  Header,
  HeaderCell,
  HeaderItem,
  HeaderWrapper,
  OrdersAccordionHeader,
  ToggleButton,
} from '@src/features/orders/styles/ordersAccordion.styled';
import CopyableAddress from '../../../atoms/CopyableAddress';

interface IProps {
  order: Omit<IOrder, 'devices'>;
  isOpen: boolean;
  toggleOpen: () => void;
}

function OrderAccordionHeader({ order, isOpen, toggleOpen }: IProps) {
  const orderCreateDate = format(new Date(order.createdAt), 'dd MMM yyyy');
  const orderCreateTime = format(new Date(order.createdAt), 'hh:mm:ss a');

  return (
    <HeaderWrapper>
      <Header>
        <HeaderItem title="order id">Order Id</HeaderItem>
        <HeaderItem>Customer</HeaderItem>
        <HeaderItem>Phone</HeaderItem>
        <HeaderItem>Shipping address</HeaderItem>
        <HeaderItem>Created at</HeaderItem>
        <HeaderItem />
      </Header>

      <OrdersAccordionHeader>
        <HeaderCell>
          <Copyable value={order.id} />
        </HeaderCell>
        <HeaderCell>
          <Copyable value={order.fullName} />
        </HeaderCell>
        <HeaderCell>
          <Copyable value={order.phone} />
        </HeaderCell>
        <HeaderCell>
          <CopyableAddress address={order.address} />
        </HeaderCell>
        <HeaderCell>
          <DateWrap>
            <div>{orderCreateDate}</div>
            <div>{orderCreateTime}</div>
          </DateWrap>
        </HeaderCell>
        <HeaderCell>
          <ToggleButton type="button" onClick={toggleOpen}>
            <ArrowIcon isOpen={isOpen} />
          </ToggleButton>
        </HeaderCell>
      </OrdersAccordionHeader>
    </HeaderWrapper>
  );
}

export default OrderAccordionHeader;
