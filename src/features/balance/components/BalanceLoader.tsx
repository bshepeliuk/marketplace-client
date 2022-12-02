import React from 'react';
import styled from 'styled-components';

import BalanceItemLoader from '../atoms/BalanceItemLoader';

interface IProps {
  amount?: number;
}

function BalanceLoader({ amount = 3 }: IProps) {
  return (
    <Wrapper>
      {Array.from({ length: amount }).map((_, idx) => (
        <BalanceItemLoader key={idx} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
`;

export default BalanceLoader;
