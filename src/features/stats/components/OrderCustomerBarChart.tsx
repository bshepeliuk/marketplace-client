import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import styled from 'styled-components';
import { ICustomerStats } from '../types';

interface IProps {
  items?: ICustomerStats[];
}

function OrderCustomerBarChart({ items }: IProps) {
  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart
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
          <XAxis dataKey="fullName" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="quantity" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

export default OrderCustomerBarChart;
