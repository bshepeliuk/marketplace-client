import React from 'react';
import getFormattedDateBySeconds from '@common/utils/getFormattedDateBySeconds';
import { formatNumber } from '@src/common/utils/formatNumber';
import getCurrencySymbol from '@common/utils/getCurrencySymbol';
import PrevNextPagination from '@src/common/components/PrevNextPagination';
import convertCentsToDollars from '@src/common/utils/convertCentsToDollars';
import LoaderView from '@common/components/Loader/Loader';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useGetTransfers from '../../hooks/useGetTransfers';
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
} from './transfersTable.styled';
import useTransfersPagination from '../../hooks/useTransfersPagination';
import { transfersSelector } from '../../selectors/transfersSelector';

function TransfersTableView() {
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
      <Cell>Automatic</Cell>
      <Cell>Created</Cell>
      <Cell>Arrival date</Cell>
    </HeaderRow>
  );
}

function TableBody() {
  const { items, isLoading } = useGetTransfers();

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

      {items.map((transfer) => {
        const amountInDollars = formatNumber(convertCentsToDollars(transfer.amount));
        const amount = `${getCurrencySymbol(transfer.currency)} ${amountInDollars}`;
        const created = getFormattedDateBySeconds(transfer.created);
        const arrivalDate = getFormattedDateBySeconds(transfer.arrival_date);

        return (
          <Row key={transfer.id}>
            <Cell>
              <Amount>{amount}</Amount>
            </Cell>
            <Cell>
              <Currency>{transfer.currency.toUpperCase()}</Currency>
            </Cell>
            <Cell>
              <Status>{transfer.status}</Status>
            </Cell>
            <Cell>{transfer.automatic.toString()}</Cell>
            <Cell>{created}</Cell>
            <Cell>{arrivalDate}</Cell>
          </Row>
        );
      })}
    </>
  );
}

function TableFooter() {
  const { isLoading } = useTypedSelector(transfersSelector);
  const { hasPagination, isNextDisabled, isPrevDisabled, onNext, onPrev } = useTransfersPagination();

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

export default TransfersTableView;
