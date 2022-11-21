import React from 'react';
import styled from 'styled-components';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import { formatNumber } from '@src/common/utils/formatNumber';
import useGetTransfers from '../hooks/useGetTransfers';

function TransfersTableView() {
  const { items, isLoading } = useGetTransfers();

  return (
    <Table>
      <HeaderRow>
        <div>Amount</div>
        <div>Created</div>
        <div>Arrival date</div>
      </HeaderRow>

      {isLoading && items.length === 0 && <div>Loading...</div>}

      {items.map((transfer) => {
        return (
          <BodyRow key={transfer.id}>
            <div>
              {formatNumber(convertCentToDollar(transfer.amount))} {transfer.currency.toUpperCase()}
            </div>
            <div>{new Date(convertSecondsToMs(transfer.created)).toDateString()}</div>
            <div>{new Date(convertSecondsToMs(transfer.arrival_date)).toDateString()}</div>
          </BodyRow>
        );
      })}
    </Table>
  );
}

const Table = styled.div``;

const BodyRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  padding: 8px 0;
  border-bottom: 1px solid rgba(236, 240, 241, 1);
`;

const HeaderRow = styled(BodyRow)`
  text-transform: uppercase;
  border-top: 1px solid rgba(236, 240, 241, 1);
  border-bottom: 1px solid rgba(236, 240, 241, 1);
  padding: 10px 0;
  font-size: 12px;
  font-weight: bold;
  color: #212121;
`;

export default TransfersTableView;
