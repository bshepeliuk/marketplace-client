import React from 'react';
import { generatePath } from 'react-router-dom';
import { format } from 'date-fns';
import { routes } from '@src/app/Router';
import { IOrderDevice } from '@src/features/orders/types';
import useDynamicHeightBasedOnVisibility from '@common/hooks/useDynamicHeightBasedOnVisibility';
import {
  Body,
  BodyHeaderCell,
  Cell,
  DeviceLink,
  Price,
  Row,
  UpdatedAtWrap,
} from '../../../styles/ordersAccordion.styled';
import OrderStatusView from './OrderStatusView';

interface IProps {
  devices: IOrderDevice[];
  isOpen: boolean;
  isStatusChangeable: boolean;
}

function OrderAccordionBody({ devices, isOpen, isStatusChangeable }: IProps) {
  const { wrapperRef, height } = useDynamicHeightBasedOnVisibility<HTMLDivElement>(isOpen);

  return (
    <Body ref={wrapperRef} isOpen={isOpen} height={height}>
      <Row>
        <BodyHeaderCell>Title</BodyHeaderCell>
        <BodyHeaderCell>Status</BodyHeaderCell>
        <BodyHeaderCell>Price</BodyHeaderCell>
        <BodyHeaderCell>Currency</BodyHeaderCell>
        <BodyHeaderCell>Quantity</BodyHeaderCell>
        <BodyHeaderCell>Total price</BodyHeaderCell>
        <BodyHeaderCell>Updated at</BodyHeaderCell>
      </Row>

      {devices.map((device) => {
        const orderDate = format(new Date(device.orderDevice.updatedAt), 'dd MMM yyyy');
        const orderTime = format(new Date(device.orderDevice.updatedAt), 'hh:mm:ss a');
        const totalPrice = device.price * device.orderDevice.quantity;

        return (
          <Row key={device.orderDevice.id}>
            <Cell>
              <DeviceLink to={generatePath(routes.device, { deviceId: String(device.id) })}>{device.name}</DeviceLink>
            </Cell>
            <Cell>
              <OrderStatusView
                isStatusChangeable={isStatusChangeable}
                orderId={device.orderDevice.id}
                status={device.orderDevice.status}
              />
            </Cell>
            <Cell>
              <Price>{device.price}</Price>
            </Cell>
            <Cell>USD</Cell>
            <Cell>{device.orderDevice.quantity}</Cell>
            <Cell>
              <Price>{totalPrice}</Price>
            </Cell>

            <Cell>
              <UpdatedAtWrap>
                <div>{orderDate}</div>
                <div>{orderTime}</div>
              </UpdatedAtWrap>
            </Cell>
          </Row>
        );
      })}
    </Body>
  );
}

export default OrderAccordionBody;
