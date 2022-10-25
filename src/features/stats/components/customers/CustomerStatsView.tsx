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
  height: 350px;
  width: 100%;
`;

export default CustomerStatsView;
