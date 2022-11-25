import React from 'react';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import { formatNumber } from '@src/common/utils/formatNumber';
import getCurrencySymbol from '@common/utils/getCurrencySymbol';
import PrevNextPagination from '@src/common/components/PrevNextPagination';
import useGetPayouts from '../../hooks/useGetPayouts';
import {
  Cell,
  EmptyCell,
  HeaderRow,
  Table,
  Row,
  Amount,
  Status,
  Currency,
  FooterRow,
  FooterBody,
} from './payoutsTable.styled';
import usePayoutsPagination from '../../hooks/usePayoutsPagination';

function PayoutsTableView() {
  const { items, isLoading } = useGetPayouts();
  const { hasPagination, onNext, onPrev, isNextDisabled, isPrevDisabled } = usePayoutsPagination();

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

      {hasPagination && (
        <FooterRow>
          <FooterBody>
            <PrevNextPagination
              onNext={onNext}
              onPrev={onPrev}
              isNextDisabled={isNextDisabled}
              isPrevDisabled={isPrevDisabled}
            />
          </FooterBody>
        </FooterRow>
      )}
    </Table>
  );
}

export default PayoutsTableView;
