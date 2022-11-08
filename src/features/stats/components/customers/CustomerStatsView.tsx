import React from 'react';
import styled from 'styled-components';

import CustomerOrderTotalChart from './CustomerOrderTotalChart';
import CustomerOrderQuantityChart from './CustomerOrderQuantityChart';
import CustomerCitiesQuantityChart from './CustomerCitiesQuantityChart';
import CustomerCitiesTotalChart from './CustomerCitiesTotalChart';

function CustomerStatsView() {
  return (
    <>
      <Wrapper>
        <CustomerOrderTotalChart />
        <CustomerOrderQuantityChart />
      </Wrapper>

      <Wrapper>
        <CustomerCitiesTotalChart />
        <CustomerCitiesQuantityChart />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 350px;
  width: 100%;
  overflow: hidden;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

export default CustomerStatsView;
