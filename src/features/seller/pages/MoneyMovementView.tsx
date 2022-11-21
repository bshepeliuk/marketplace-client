import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import BalanceView from '@features/balance/components/BalanceView';
import ChargesTableView from '@src/features/charges/components/ChargesTableView';
import PayoutsTableView from '@src/features/payouts/components/PayoutsTableView';
import TransfersTableView from '@src/features/transfers/components/TransfersTableView';
import MoneyMovementNavigation from '../components/MoneyMovementNavigation';

function MoneyMoveMentView() {
  return (
    <Container>
      <BalanceWrapper>
        <BalanceView />
      </BalanceWrapper>

      <MoneyMovementNavigation />

      <Routes>
        <Route path="/" element={<ChargesTableView />} />
        <Route path="/payouts" element={<PayoutsTableView />} />
        <Route path="/transfers" element={<TransfersTableView />} />
        <Route path="*" element={<div>Not Found....</div>} />
      </Routes>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BalanceWrapper = styled.div`
  padding: 40px 0;
`;

export default MoneyMoveMentView;
