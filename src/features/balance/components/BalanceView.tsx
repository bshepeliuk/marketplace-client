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
      <BalanceItemView
        background="linear-gradient(135deg, #42e595 0%,#3ab2b8 100%)"
        title="Available"
        balanceList={calculateTotalBalance(balance.available)}
      />
      <BalanceItemView
        background="linear-gradient(135deg, #13f1fc 0%,#0470dc 100%)"
        title="Instant Available"
        balanceList={calculateTotalBalance(balance.instant_available)}
      />
      <BalanceItemView
        background="linear-gradient(135deg, #fad961 0%,#f76b1b 100%)"
        title="Pending"
        balanceList={calculateTotalBalance(balance.pending)}
      />
    </Wrapper>
  );
}

interface IProps {
  title: string;
  background?: string;
  balanceList: IBalanceItem[];
}

function BalanceItemView({ title, balanceList, background = '' }: IProps) {
  return (
    <BalanceContainer background={background}>
      <BalanceTitle>{title}</BalanceTitle>

      <ul>
        {balanceList.map((item) => {
          return (
            <ListItem key={item.currency}>
              {formatNumber(convertCentToDollar(item.amount))} {item.currency.toUpperCase()}
            </ListItem>
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

const BalanceContainer = styled.div<{ background: string }>`
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  background: ${(props) => props.background};
  border-radius: 4px;
  min-width: 240px;
  min-height: 100px;
`;
const BalanceTitle = styled.h1`
  color: #fff;
  font-family: 'Roboto';
  text-transform: uppercase;
  font-size: 20px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  color: #2c3e50;
  font-weight: bold;
  font-family: 'Roboto';
`;

export default BalanceView;
