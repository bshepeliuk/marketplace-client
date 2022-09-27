import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { generatePath, Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { routes } from '@src/app/Router';
import { IOrder, IOrderDevice } from '@src/features/purchases/types';
import useGetOrders from '../hooks/useGetOrders';
import OrderStatusSelect from '../components/OrderStatusSelect';

function OrdersView() {
  const { items, isLoading } = useGetOrders();

  if (isLoading) return <div>isLoading...</div>;

  return (
    <Container>
      <Wrapper>
        {items.map(([order, devices]) => {
          return <OrderItemView key={order.id} order={order} devices={devices} />;
        })}
      </Wrapper>
    </Container>
  );
}

interface IOrderItemProps {
  order: Omit<IOrder, 'devices'>;
  devices: IOrderDevice[];
}

function OrderItemView({ order, devices }: IOrderItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  const createdAt = format(new Date(order.createdAt), 'dd MMMM yyyy hh:mm:ss a');

  return (
    <Wrapper>
      <div style={{ position: 'relative' }}>
        {' '}
        <Header>
          <HeaderItem>Order Id</HeaderItem>
          <HeaderItem>Customer</HeaderItem>
          <HeaderItem>Phone</HeaderItem>
          <HeaderItem>Shipping address</HeaderItem>
          <HeaderItem>Created at</HeaderItem>
          <HeaderItem />
        </Header>
        <OrdersAccordionHeader>
          <div>{order.id}</div>

          <div>{order.fullName}</div>

          <div>{order.phone}</div>
          <div>
            <div>
              {order.address.country}, {order.address.city}, {order.address.state}
            </div>
            <div>
              {order.address.line1}, {order.address.line2}
            </div>
          </div>
          <div>{createdAt}</div>
          <div>
            <ToggleButton type="button" onClick={toggleOpen}>
              <ArrowIcon isOpen={isOpen} />
            </ToggleButton>
          </div>
        </OrdersAccordionHeader>
      </div>

      {isOpen && (
        <List>
          <OrderRow>
            <div>Title</div>
            <div>Status</div>
            <div>Price</div>
            <div>Currency</div>
            <div>Quantity</div>
            <div>Total</div>
            <div>Updated at</div>
          </OrderRow>

          {devices.map((device) => {
            const orderDate = format(new Date(device.orderDevice.updatedAt), 'dd MMM yyyy');
            const orderTime = format(new Date(device.orderDevice.updatedAt), 'hh:mm:ss a');

            return (
              <OrderRow key={device.orderDevice.id}>
                <div>
                  <Link to={generatePath(routes.device, { deviceId: String(device.id) })}>{device.name}</Link>
                </div>
                <div>
                  <OrderStatusSelect orderDeviceId={device.orderDevice.id} defaultValue={device.orderDevice.status} />
                </div>
                <div>{device.price}</div>
                <div>USD</div>
                <div>{device.orderDevice.quantity}</div>
                <div>{device.price * device.orderDevice.quantity}</div>

                <div>
                  <div>{orderDate}</div>
                  <div>{orderTime}</div>
                </div>
              </OrderRow>
            );
          })}
        </List>
      )}
    </Wrapper>
  );
}

const HeaderItem = styled.div`
  border-radius: 2px;
  background-color: #8395a7;
  padding: 0px 20px;
  color: #fff;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-items: center;
  border-radius: 4px;
  gap: 10px;
  padding: 0 10px;
  position: absolute;
  width: 100%;
  top: -7px;
`;

const Wrapper = styled.div`
  padding-top: 10px;
`;

const OrdersAccordionHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-items: start;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
  border: 1px solid rgba(189, 195, 199, 1);
  box-shadow: rgb(99 99 99 / 7%) 0px 2px 8px 0px;
  background-color: #d2dae2;
  color: #34495e;
  gap: 10px;
`;

const ToggleButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ArrowIcon = styled(({ isOpen, ...props }) => <IoIosArrowForward {...props} />)<{
  isOpen: boolean;
  props: unknown;
}>`
  transform: ${({ isOpen }) => {
    return isOpen ? 'rotate(-90deg)' : 'rotate(90deg)';
  }};
  transition: all 0.3s ease-in-out;
`;

const List = styled.ul`
  grid-column: 1 / -1;
  border: 1px solid #ecf0f1;
  padding: 10px;
  margin-bottom: 10px;
`;

const OrderRow = styled.li`
  background-color: #fff;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(7, minmax(182px, 1fr));
  margin-bottom: 5px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 20px 6px 20px;
  overflow-x: auto;
`;

export default OrdersView;
