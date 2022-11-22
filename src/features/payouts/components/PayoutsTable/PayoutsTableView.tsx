import React from 'react';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import { formatNumber } from '@src/common/utils/formatNumber';
import getCurrencySymbol from '@common/utils/getCurrencySymbol';
import useGetPayouts from '../../hooks/useGetPayouts';
import { Cell, EmptyCell, HeaderRow, Table, Row, Amount, Status, Currency } from './payoutsTable.styled';

function PayoutsTableView() {
  const { items, isLoading } = useGetPayouts();

  const hasLoader = isLoading && items.length === 0;

  return (
    <Table>
      <HeaderRow>
        <Cell>Amount</Cell>
        <EmptyCell />
        <Cell>Status</Cell>
        <Cell>Initiated</Cell>
        <Cell>Arrival Date</Cell>
      </HeaderRow>

      {hasLoader && <div>Loading...</div>}

      {items.map((payout) => {
        const amount = `${getCurrencySymbol(payout.currency)} ${formatNumber(convertCentToDollar(payout.amount))}`;

        return (
          <Row key={payout.id}>
            <Cell>
              <Amount>{amount}</Amount>
            </Cell>
            <Cell>
              <Currency>{payout.currency.toUpperCase()}</Currency>
            </Cell>
            <Cell>
              <Status>{payout.status}</Status>
            </Cell>
            <Cell>{new Date(convertSecondsToMs(payout.created)).toDateString()}</Cell>
            <Cell>{new Date(convertSecondsToMs(payout.arrival_date)).toDateString()}</Cell>
          </Row>
        );
      })}
    </Table>
  );
}

export default PayoutsTableView;
