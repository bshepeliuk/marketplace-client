import React from 'react';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import { formatNumber } from '@src/common/utils/formatNumber';
import Copyable from '@common/components/Copyable/Copyable';
import PrevNextPagination from '@src/common/components/PrevNextPagination';
import getCurrencySymbol from '@src/common/utils/getCurrencySymbol';
import useGetCharges from '../../hooks/useGetCharges';
import useChargesPagination from '../../hooks/useChargesPagination';
import {
  Amount,
  BodyFooter,
  Cell,
  ChargeId,
  Currency,
  EmptyCell,
  HeaderRow,
  Row,
  Status,
  Table,
} from './chargesTable.styled';

function ChargesTableView() {
  const { items, isLoading } = useGetCharges();
  const { onNext, onPrev, isNextDisabled, isPrevDisabled, hasPagination } = useChargesPagination();

  const hasLoader = isLoading && items.length === 0;

  return (
    <Table>
      <HeaderRow>
        <Cell>Amount</Cell>
        <EmptyCell />
        <Cell>Status</Cell>
        <Cell>Initiated</Cell>
        <Cell>ID</Cell>
      </HeaderRow>

      {hasLoader && <div>Loading...</div>}

      {items.map((charge) => {
        const amount = `${getCurrencySymbol(charge.currency)} ${formatNumber(convertCentToDollar(charge.amount))}`;
        const created = new Date(convertSecondsToMs(charge.created)).toDateString();

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

      {hasPagination && (
        <BodyFooter>
          <PrevNextPagination
            onNext={onNext}
            onPrev={onPrev}
            isNextDisabled={isNextDisabled}
            isPrevDisabled={isPrevDisabled}
          />
        </BodyFooter>
      )}
    </Table>
  );
}

export default ChargesTableView;
