import React from 'react';
import styled from 'styled-components';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import { formatNumber } from '@src/common/utils/formatNumber';
import useGetPayouts from '../hooks/useGetPayouts';

function PayoutsTableView() {
  const { items, isLoading } = useGetPayouts();

  return (
    <Table>
      <HeaderRow>
        <div>Amount</div>
        <div>Status</div>
        <div>Initiated</div>
      </HeaderRow>

      {isLoading && items.length === 0 && <div>Loading...</div>}

      {items.map((payout) => {
        return (
          <BodyRow key={payout.id}>
            <div>
              {formatNumber(convertCentToDollar(payout.amount))} {payout.currency.toUpperCase()}
            </div>
            <div>{payout.status}</div>
            <div>{new Date(convertSecondsToMs(payout.created)).toDateString()}</div>
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

export default PayoutsTableView;
