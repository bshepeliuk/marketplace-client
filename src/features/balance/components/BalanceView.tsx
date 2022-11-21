import React from 'react';
import styled from 'styled-components';

import convertCentToDollar from '@src/common/utils/convertCentToDollar';
import { formatNumber } from '@src/common/utils/formatNumber';
import calculateTotalBalance from '../helpers/calculateTotalBalance';
import useGetBalance from '../hooks/useGetBalance';
import { IBalanceItem } from '../types';

function BalanceView() {
  const { balance } = useGetBalance();

  if (balance === null) return null;

  return (
    <Wrapper>
      <BalanceItemView color="#59CE8F" title="Available" balanceList={calculateTotalBalance(balance.available)} />
      <BalanceItemView
        color="#59C1BD"
        title="Instant Available"
        balanceList={calculateTotalBalance(balance.instant_available)}
      />
      <BalanceItemView color="#F49D1A" title="Pending" balanceList={calculateTotalBalance(balance.pending)} />
    </Wrapper>
  );
}

interface IProps {
  title: string;
  color?: string;
  balanceList: IBalanceItem[];
}

function BalanceItemView({ title, balanceList, color = '' }: IProps) {
  return (
    <BalanceContainer color={color}>
      <BalanceTitle>{title}</BalanceTitle>

      <ul>
        {balanceList.map((item) => {
          return (
            <li key={item.currency}>
              {formatNumber(convertCentToDollar(item.amount))} {item.currency.toUpperCase()}
            </li>
          );
        })}
      </ul>
    </BalanceContainer>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
`;

const BalanceContainer = styled.div<{ color: string }>`
  padding: 20px;
  background-color: ${(props) => props.color};
  border-radius: 4px;
`;
const BalanceTitle = styled.h1``;

export default BalanceView;
