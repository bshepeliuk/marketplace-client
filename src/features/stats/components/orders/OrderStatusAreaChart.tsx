import React from 'react';
import styled from 'styled-components';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { statusStatsSelector } from '../../selectors/statusStatsSelector';

function OrderStatusAreaChart() {
  const items = useTypedSelector(statusStatsSelector);

  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart
          data={items}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#24A19C" fill="#24A19C" />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 65%;
  height: 350px;
`;

export default OrderStatusAreaChart;
