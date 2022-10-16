import React, { Fragment } from 'react';

import { BodyHeaderCell, Header, HeaderItem, HeaderWrapper } from '../../styles/ordersAccordion.styled';
import BodyCellLoader from './components/BodyCellLoader';
import HeaderCellLoader from './components/HeaderCellLoader';
import OrderIdLoader from './components/OrderIdLoader';
import {
  CustomBody,
  CustomOrdersAccordionHeader,
  CustomRow,
  CustomWrapper,
  BodyCell,
  HeaderContainer,
} from './loader.styled';

interface IProps {
  headerAmountOfItems?: number;
  bodyAmountOfItems?: number;
}

function OrderAccordionLoader({ headerAmountOfItems = 4, bodyAmountOfItems = 2 }: IProps) {
  return (
    <CustomWrapper>
      {Array.from({ length: headerAmountOfItems }).map((_, idx) => {
        return (
          <Fragment key={idx}>
            <LoaderHeader />
            <LoaderBody bodyAmountOfItems={bodyAmountOfItems} />
          </Fragment>
        );
      })}
    </CustomWrapper>
  );
}

function LoaderHeader() {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Header>
          <HeaderItem>Order Id</HeaderItem>
          <HeaderItem>Customer</HeaderItem>
          <HeaderItem>Phone</HeaderItem>
          <HeaderItem>Shipping address</HeaderItem>
          <HeaderItem>Created at</HeaderItem>
          <HeaderItem />
        </Header>

        <CustomOrdersAccordionHeader>
          <OrderIdLoader />
          <HeaderCellLoader />
          <HeaderCellLoader />
          <HeaderCellLoader />
          <HeaderCellLoader />
          <HeaderCellLoader />
        </CustomOrdersAccordionHeader>
      </HeaderWrapper>
    </HeaderContainer>
  );
}

function LoaderBody({ bodyAmountOfItems = 2 }: { bodyAmountOfItems?: number }) {
  return (
    <CustomBody isOpen>
      <CustomRow>
        <BodyHeaderCell>Title</BodyHeaderCell>
        <BodyHeaderCell>Status</BodyHeaderCell>
        <BodyHeaderCell>Price</BodyHeaderCell>
        <BodyHeaderCell>Currency</BodyHeaderCell>
        <BodyHeaderCell>Quantity</BodyHeaderCell>
        <BodyHeaderCell>Total price</BodyHeaderCell>
        <BodyHeaderCell>Updated at</BodyHeaderCell>
      </CustomRow>

      {Array.from({ length: bodyAmountOfItems }).map((_, bodyIdx) => {
        return (
          <CustomRow key={bodyIdx}>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
            <BodyCell>
              <BodyCellLoader />
            </BodyCell>
          </CustomRow>
        );
      })}
    </CustomBody>
  );
}

export default OrderAccordionLoader;
