import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { customerStatsSelector } from '../../selectors/customerStatsSelector';

function CustomerOrderQuantityChart() {
  const items = useTypedSelector(customerStatsSelector);

  if (items === undefined) return null;

  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart
          syncId="customer-charts"
          width={500}
          height={400}
          data={items}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fullName" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 'enter your max value ']} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area type="monotone" dataKey="quantity" stackId="1" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 300px;
  width: 50%;
`;

export default CustomerOrderQuantityChart;
