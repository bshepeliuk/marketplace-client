import React from 'react';
import styled from 'styled-components';
import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import convertSecondsToMs from '@src/common/utils/convertSecondsToMs';
import { formatNumber } from '@src/common/utils/formatNumber';
import MoreItemsNavigation from '@common/components/MoreItemsNavigation';
import useGetCharges from '../hooks/useGetCharges';
import useChargesPagination from '../hooks/useChargesPagination';

function ChargesTableView() {
  const { items, isLoading } = useGetCharges();
  const { onNext, onPrev, isNextDisabled, isPrevDisabled, hasPagination } = useChargesPagination();

  return (
    <Table>
      <HeaderRow>
        <div>Amount</div>
        <div>Status</div>
        <div>Initiated</div>
        <div>ID</div>
      </HeaderRow>

      {isLoading && items.length === 0 && <div>Loading...</div>}

      {items.map((charge) => {
        return (
          <BodyRow key={charge.id}>
            <div>
              {formatNumber(convertCentToDollar(charge.amount))} {charge.currency.toUpperCase()}
            </div>
            <div>{charge.status}</div>
            <div>{new Date(convertSecondsToMs(charge.created)).toDateString()}</div>
            <div>{charge.id}</div>
          </BodyRow>
        );
      })}

      {hasPagination && (
        <BodyFooter>
          <MoreItemsNavigation
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

const Table = styled.div``;

const BodyFooter = styled.div`
  display: flex;
  justify-content: end;
  padding: 20px 0;
`;

const BodyRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
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

export default ChargesTableView;
