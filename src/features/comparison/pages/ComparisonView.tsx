import { routes } from '@src/app/Router';
import {
  IDevice,
  IDeviceImage,
  IDeviceWithCount,
} from '@src/features/devices/types';
import useMakePayment from '@src/features/payment/pages/hooks/useMakePayment';
import React from 'react';
import { AiFillCloseCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { generatePath, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useDeleteFromComparison from '../hooks/useDeleteFromComparison';
import useGetComparisonList from '../hooks/useGetComparisonList';
import useGetComparisonOptions from '../hooks/useGetComparisonOptions';

interface IHeaderDevice extends IDevice {
  type: 'header';
}

export const TableCellTypes = {
  FeatureValue: 'feature-value-cell',
  FeatureKey: 'feature-header-cell',
  Header: 'header',
  HeaderInfo: 'header-info',
} as const;

function ComparisonView() {
  const { items } = useGetComparisonList();
  const options = useGetComparisonOptions(items);

  const data = options.map(([key, value]) => [
    { type: TableCellTypes.FeatureKey, value: key },
    ...value.map((v) => ({ type: TableCellTypes.FeatureValue, value: v })),
  ]);
  const devices = items.map((device) => ({
    type: TableCellTypes.Header,
    ...device,
  }));

  const headers = [
    {
      type: TableCellTypes.HeaderInfo,
      value: `${items.length} devices have been added for comparison.`,
    },
    ...devices,
  ] as (IHeaderDevice | { type: 'header-info'; value: string })[];

  const rows = [headers, ...data];

  if (items.length === 0) {
    return (
      <Container>
        Unfortunately, you have not added devices for comparison yet.
      </Container>
    );
  }

  return (
    <Container>
      {rows.map((row) => {
        return (
          <List columns={row.length}>
            {row.map((item, idx) => {
              if (item.type === TableCellTypes.HeaderInfo) {
                return (
                  <InfoCell key={`header-${item.value}`}>{item.value}</InfoCell>
                );
              }

              if (item.type === TableCellTypes.Header) {
                return <HeaderItem device={item as IDevice} />;
              }

              if (item.type === TableCellTypes.FeatureKey) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <FeatureHeaderCell key={`feature-header-cell-${idx}`}>
                    {item.value}
                  </FeatureHeaderCell>
                );
              }

              if (item.type === TableCellTypes.FeatureValue) {
                // eslint-disable-next-line react/no-array-index-key
                return <ListItem key={`cell-${idx}`}>{item.value}</ListItem>;
              }

              return null;
            })}
          </List>
        );
      })}
    </Container>
  );
}

function HeaderItem({ device }: { device: IDevice }) {
  const location = useLocation();
  const { pay, isPending } = useMakePayment([
    { ...device, count: 1 },
  ] as IDeviceWithCount[]);
  const { deleteById } = useDeleteFromComparison();

  return (
    <HeaderListItem key={`header-${device.name}`}>
      <Img src={(device.images[0] as IDeviceImage).url} alt={device.name} />

      <DeviceLink
        to={generatePath(routes.device, {
          deviceId: `${device.id}`,
        })}
        state={{
          from: {
            pathname: location.pathname,
            search: location.search,
          },
        }}
      >
        {device.name}
      </DeviceLink>

      <DeleteIcon onClick={() => deleteById(device.id)} />

      <Price>{device.price} $</Price>
      <PayButton onClick={pay} disabled={isPending}>
        <AiOutlineShoppingCart />
      </PayButton>
    </HeaderListItem>
  );
}

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 5px 10px;
  overflow-x: auto;
  padding: 0 10px 15px 10px;

  &::-webkit-scrollbar {
    height: 15px;
    border: 1px solid #d5d5d5;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(236, 240, 241, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }
`;

const ListItem = styled.li`
  background-color: #f5f6fa;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #34495e;

  &:hover {
    background-color: #f1f2f6;
    cursor: pointer;
  }
`;

const FeatureHeaderCell = styled.li`
  background-color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const HeaderListItem = styled.li`
  display: grid;
  grid-template-rows: 200px 1fr 1fr;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  background-color: #fff;
  padding: 15px;
  row-gap: 8px;
`;

const List = styled.ul<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => {
    return `repeat(${props.columns}, 250px)`;
  }};

  width: max-content;
  position: relative;
  z-index: 1;
  border: 1px solid #95a5a6;
  background-color: #95a5a6;
  grid-gap: 1px;
  margin-bottom: -1px;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    border: 1px solid #1abc9c;
    z-index: 2;
    background-color: #f5f6fa;
  }
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  align-self: center;
  justify-self: center;
  grid-column: 1 / -1;
  grid-row: 1;
  user-select: none;
`;

const DeleteIcon = styled(AiFillCloseCircle)`
  color: rgb(52, 73, 94);
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 25px;
  color: rgba(52, 73, 94, 1);
  cursor: pointer;
`;

const InfoCell = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  color: #303030;
`;

const Price = styled.p`
  color: #e00027;
  margin: 0;
  justify-self: start;
  align-self: center;
  font-size: 18px;
`;

const DeviceLink = styled(Link)`
  grid-column: 1 / -1;
  grid-row: 2;
  justify-self: start;
  align-self: center;
  font-size: 17px;
  text-decoration: none;
  font-weight: 400;
  line-height: 18px;
  color: #303030;

  &:hover {
    color: #5285cc;
  }
`;

const PayButton = styled.button`
  background-color: #e31837;
  border: none;
  border-radius: 4px;
  height: 36px;
  width: 52px;
  color: #fff;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  grid-row: 3;
  grid-column: 2;
  justify-self: end;
`;

export default ComparisonView;
