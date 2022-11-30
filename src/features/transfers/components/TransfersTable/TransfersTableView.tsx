import React from 'react';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import { formatNumber } from '@src/common/utils/formatNumber';
import getCurrencySymbol from '@common/utils/getCurrencySymbol';
import PrevNextPagination from '@src/common/components/PrevNextPagination';
import LoaderView from '@common/components/Loader/Loader';
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

function TransfersTableView() {
  const { items, isLoading } = useGetTransfers();
  const { hasPagination, isNextDisabled, isPrevDisabled, onNext, onPrev } = useTransfersPagination();

  const hasNoItems = items.length === 0;
  const hasLoader = isLoading && hasNoItems;
  const hasNoLoader = !hasLoader;

  return (
    <Table>
      <HeaderRow>
        <Cell>Amount</Cell>
        <EmptyCell />
        <Cell>Status</Cell>
        <Cell>Automatic</Cell>
        <Cell>Created</Cell>
        <Cell>Arrival date</Cell>
      </HeaderRow>

      {hasLoader && (
        <LoaderWrapper>
          <LoaderView size={20} color="#3498db" strokeWidth={2} />
        </LoaderWrapper>
      )}
      {hasNoLoader && hasNoItems && <div>No items found.</div>}

      {items.map((transfer) => {
        const amount = `${getCurrencySymbol(transfer.currency)} ${formatNumber(convertCentToDollar(transfer.amount))}`;

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
            <Cell>{new Date(convertSecondsToMs(transfer.created)).toDateString()}</Cell>
            <Cell>{new Date(convertSecondsToMs(transfer.arrival_date)).toDateString()}</Cell>
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
              isLoading={isLoading}
            />
          </FooterBody>
        </FooterRow>
      )}
    </Table>
  );
}

export default TransfersTableView;
