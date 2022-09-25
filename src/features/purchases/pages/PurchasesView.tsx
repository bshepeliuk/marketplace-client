import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { generatePath, Link } from 'react-router-dom';
import { routes } from '@src/app/Router';
import useGetPurchases from '../hooks/useGetPurchases';

function PurchasesView() {
  const { items, isLoading } = useGetPurchases();

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <Table>
      <Header>
        <HeaderCell>Order id</HeaderCell>
        <HeaderCell>Status</HeaderCell>
        <HeaderCell>Title</HeaderCell>
        <HeaderCell>Price</HeaderCell>
        <HeaderCell>Currency</HeaderCell>
        <HeaderCell>Quantity</HeaderCell>
        <HeaderCell>Total price</HeaderCell>
        <HeaderCell>Phone number</HeaderCell>
        <HeaderCell>Shipping address</HeaderCell>
        <HeaderCell>Updated at</HeaderCell>
      </Header>

      <Body>
        {items.map((item) => {
          return item.devices.map((device) => {
            if (device.order === undefined) return null;

            const orderUpdatedAt = format(new Date(device.order.updatedAt), 'dd MMM yyyy, h:m:s a');

            return (
              <ListItem key={device.id}>
                <Cell>{item.id}</Cell>
                <Cell>
                  <PurchaseStatus>{device.order.status}</PurchaseStatus>
                </Cell>
                <TitleCell>
                  <Link to={generatePath(routes.device, { deviceId: String(device.id) })}>{device.name}</Link>
                </TitleCell>
                <Cell>{device.price}</Cell>
                <Cell>USD</Cell>
                <Cell>{device.order.quantity}</Cell>
                <Cell>{device.price * device.order.quantity}</Cell>
                <Cell>{item.phone}</Cell>
                <Cell>
                  {item.address.country}, {item.address.city}, {item.address.state}, {item.address.line1},{' '}
                  {item.address.line2}
                </Cell>
                <Cell>{orderUpdatedAt}</Cell>
              </ListItem>
            );
          });
        })}
      </Body>
    </Table>
  );
}

const Table = styled.div`
  max-width: 1600px;
  margin: 50px auto;
  padding: 0 10px 6px 10px;
  overflow-x: auto;
`;

const Body = styled.div`
  display: grid;
  gap: 1px;
  background-color: var(--purchase-table-color);
  border: 1px solid var(--purchase-table-line-color);
  border-radius: 3px;
  width: fit-content;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(120px, 1fr));
  grid-auto-rows: max-content;
  align-items: center;
  justify-items: center;
  margin-bottom: 10px;
  gap: 1px;
  width: 100%;
  background-color: #95a5a6;
  border: 1px solid #95a5a6;
  border-radius: 4px;

  @media (max-width: 1110px) {
    width: fit-content;
  }
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(10, minmax(120px, 1fr));
  grid-auto-rows: max-content;
  align-items: center;
  justify-items: center;
  gap: 1px;
  background-color: var(--purchase-table-color);
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

const PurchaseStatus = styled.span`
  background-color: #1abc9c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 2px;
  color: #fff;
  font-weight: bold;
`;

export default PurchasesView;
