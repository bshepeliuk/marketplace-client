import React from 'react';
import convertCentsToDollars from '@common/utils/convertCentsToDollars';
import getFormattedDateBySeconds from '@src/common/utils/getFormattedDateBySeconds';
import { formatNumber } from '@src/common/utils/formatNumber';
import getCurrencySymbol from '@common/utils/getCurrencySymbol';
import LoaderView from '@common/components/Loader/Loader';
import PrevNextPagination from '@src/common/components/PrevNextPagination';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
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
  LoaderWrapper,
} from './payoutsTable.styled';
import usePayoutsPagination from '../../hooks/usePayoutsPagination';
import { payoutsSelector } from '../../selectors/payoutsSelector';

function PayoutsTableView() {
  return (
    <Table>
      <TableHeader />
      <TableBody />
      <TableFooter />
    </Table>
  );
}

function TableHeader() {
  return (
    <HeaderRow>
      <Cell>Amount</Cell>
      <EmptyCell />
      <Cell>Status</Cell>
      <Cell>Initiated</Cell>
      <Cell>Arrival Date</Cell>
    </HeaderRow>
  );
}

function TableBody() {
  const { items, isLoading } = useGetPayouts();

  const hasNoItems = items.length === 0;
  const hasLoader = isLoading && hasNoItems;
  const hasNoLoader = !hasLoader;

  return (
    <>
      {hasLoader && (
        <LoaderWrapper>
          <LoaderView size={20} color="#3498db" strokeWidth={2} />
        </LoaderWrapper>
      )}

      {hasNoLoader && hasNoItems && <div>No items found.</div>}

      {items.map((payout) => {
        const amountInDollars = formatNumber(convertCentsToDollars(payout.amount));
        const amount = `${getCurrencySymbol(payout.currency)} ${amountInDollars}`;
        const created = getFormattedDateBySeconds(payout.created);
        const arrivalDate = getFormattedDateBySeconds(payout.arrival_date);

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
            <Cell>{created}</Cell>
            <Cell>{arrivalDate}</Cell>
          </Row>
        );
      })}
    </>
  );
}

function TableFooter() {
  const { isLoading } = useTypedSelector(payoutsSelector);
  const { hasPagination, onNext, onPrev, isNextDisabled, isPrevDisabled } = usePayoutsPagination();

  const hasNoPagination = !hasPagination;

  if (hasNoPagination) return null;

  return (
    <FooterRow>
      <FooterBody>
        <PrevNextPagination
          onNext={onNext}
          onPrev={onPrev}
          isNextDisabled={isNextDisabled}
          isPrevDisabled={isPrevDisabled}
          isLoading={isLoading}
        />
      </FooterBody>
    </FooterRow>
  );
}

export default PayoutsTableView;
