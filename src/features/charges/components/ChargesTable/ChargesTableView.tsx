import React from 'react';
import { formatNumber } from '@src/common/utils/formatNumber';
import Copyable from '@common/components/Copyable/Copyable';
import LoaderView from '@common/components/Loader/Loader';
import PrevNextPagination from '@src/common/components/PrevNextPagination';
import convertCentsToDollars from '@src/common/utils/convertCentsToDollars';
import getCurrencySymbol from '@src/common/utils/getCurrencySymbol';
import getFormattedDateBySeconds from '@common/utils/getFormattedDateBySeconds';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useGetCharges from '../../hooks/useGetCharges';
import useChargesPagination from '../../hooks/useChargesPagination';
import {
  Amount,
  FooterBody,
  Cell,
  ChargeId,
  Currency,
  EmptyCell,
  HeaderRow,
  Row,
  Status,
  Table,
  FooterRow,
  LoaderWrapper,
} from './chargesTable.styled';
import { chargesSelector } from '../../selectors/chargesSelector';

function ChargesTableView() {
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
      <Cell>ID</Cell>
    </HeaderRow>
  );
}

function TableBody() {
  const { items, isLoading } = useGetCharges();

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

      {items.map((charge) => {
        const amountInDollars = formatNumber(convertCentsToDollars(charge.amount));
        const amount = `${getCurrencySymbol(charge.currency)} ${amountInDollars}`;
        const created = getFormattedDateBySeconds(charge.created);

        return (
          <Row key={charge.id}>
            <Cell>
              <Amount>{amount}</Amount>
            </Cell>
            <Cell>
              <Currency>{charge.currency.toUpperCase()}</Currency>
            </Cell>
            <Cell>
              <Status>{charge.status}</Status>
            </Cell>
            <Cell>{created}</Cell>
            <Cell>
              <ChargeId>
                <Copyable value={charge.id} />
              </ChargeId>
            </Cell>
          </Row>
        );
      })}
    </>
  );
}

function TableFooter() {
  const { isLoading } = useTypedSelector(chargesSelector);
  const { onNext, onPrev, isNextDisabled, isPrevDisabled, hasPagination } = useChargesPagination();

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

export default ChargesTableView;
