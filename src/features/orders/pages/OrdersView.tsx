import React from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import styled from 'styled-components';
import { format } from 'date-fns';
import { generatePath, Link } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { OrderStatusValues, OrderStatus } from '@src/features/purchases/types';
import createOption from '@common/utils/createSelectOption';
import { Option } from '@src/common/types/selectTypes';
import useGetOrders from '../hooks/useGetOrders';

function OrdersView() {
  const { items, isLoading } = useGetOrders();

  if (isLoading) return <div>isLoading...</div>;

  return (
    <Table>
      <TableHeader>
        <HeaderCell>Order id</HeaderCell>
        <HeaderCell>Title</HeaderCell>
        <HeaderCell>Price</HeaderCell>
        <HeaderCell>Currency</HeaderCell>
        <HeaderCell>Quantity</HeaderCell>
        <HeaderCell>Total price</HeaderCell>
        <HeaderCell>Status</HeaderCell>
        <HeaderCell>Customer</HeaderCell>
        <HeaderCell>Phone</HeaderCell>
        <HeaderCell>Shipping address</HeaderCell>
        <HeaderCell>Updated at</HeaderCell>
      </TableHeader>

      <TableBody>
        {items.map((item) => {
          return item.devices.map((device) => {
            if (device.order === undefined) return null;

            const orderDate = format(new Date(device.order.updatedAt), 'dd MMM yyyy');
            const orderTime = format(new Date(device.order.updatedAt), 'hh:mm:ss a');

            return (
              <Row key={device.order.id}>
                <Cell>{device.order.orderId}</Cell>
                <TitleCell>
                  <Link to={generatePath(routes.device, { deviceId: String(device.id) })}>{device.name}</Link>
                </TitleCell>
                <Cell>{device.price}</Cell>
                <Cell>USD</Cell>
                <Cell>{device.order.quantity}</Cell>
                <Cell>{device.price * device.order.quantity}</Cell>
                <Cell>
                  <OrderStatusSelect defaultValue={device.order.status} />
                </Cell>
                <Cell>{item.fullName}</Cell>
                <Cell>{item.phone}</Cell>
                <Cell>
                  {item.address.country}, {item.address.city}, {item.address.state}, {item.address.line1},{' '}
                  {item.address.line2}
                </Cell>
                <Cell>
                  <DateWrap>
                    <div>{orderDate}</div>
                    <div>{orderTime}</div>
                  </DateWrap>
                </Cell>
              </Row>
            );
          });
        })}
      </TableBody>
    </Table>
  );
}

const OrderStatusColor: Record<OrderStatusValues, string> = {
  [OrderStatus.paid]: '#1dd1a1',
  [OrderStatus.delivered]: '#20bf6b',
  [OrderStatus.completed]: '#51B164',
  [OrderStatus.unpaid]: '#ff6348',
  [OrderStatus.shipped]: '#7d5fff',
  [OrderStatus.inProgress]: '#4bcffa',
  [OrderStatus.processing]: '#eccc68',
  [OrderStatus.unshipped]: '#38ada9',
  [OrderStatus.refunded]: '#8e44ad',
  [OrderStatus.rejected]: '#f53b57',
};

function OrderStatusSelect({ defaultValue }: { defaultValue: OrderStatusValues }) {
  const options = Object.values(OrderStatus).map((status) => createOption(status));

  const customStyles: StylesConfig<Option, false> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', width: 170 }),
    container: (styles) => ({ ...styles, width: 200 }),
    option: (styles) => ({ ...styles }),
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: OrderStatusColor[data!.label as OrderStatusValues],
        padding: '8px 2px',
        borderRadius: '4px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px',
        letterSpacing: '1px',
      };
    },
  };

  // TODO: change order status;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const onChange = (option: SingleValue<Option>) => {};

  return (
    <Select
      maxMenuHeight={190}
      menuShouldBlockScroll
      menuPlacement="auto"
      menuPosition="fixed"
      defaultValue={{ label: defaultValue, value: defaultValue }}
      options={options}
      onChange={onChange}
      styles={customStyles}
    />
  );
}

const Table = styled.div`
  max-width: 1600px;
  margin: 20px auto;
  padding: 0 10px 6px 10px;
  overflow-x: auto;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, minmax(120px, 1fr)) 200px repeat(4, minmax(120px, 1fr));
  grid-auto-rows: max-content;
  align-items: center;
  justify-items: center;
  margin-bottom: 10px;
  gap: 1px;
  width: 100%;
  background-color: #95a5a6;
  border: 1px solid #95a5a6;
  border-radius: 4px;

  @media (max-width: 1440px) {
    width: fit-content;
  }
`;

const TableBody = styled.div`
  display: grid;
  gap: 1px;
  background-color: var(--purchase-table-color);
  border: 1px solid var(--purchase-table-line-color);
  border-radius: 3px;
  width: fit-content;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(5, minmax(120px, 1fr)) 200px repeat(4, minmax(120px, 1fr));
  grid-auto-rows: max-content;
  align-items: center;
  justify-items: center;
  gap: 1px;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purchase-table-cell-color);
  padding: 10px;
`;

const HeaderCell = styled(Cell)`
  background-color: var(--purchase-table-color);
  color: #34495e;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
`;

const TitleCell = styled(Cell)`
  justify-content: start;
`;

const DateWrap = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

export default OrdersView;
