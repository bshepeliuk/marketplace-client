import React from 'react';
import styled from 'styled-components';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { IStatusStats } from '../types';

interface IProps {
  items?: IStatusStats[];
}

function OrderStatusAreaChart({ items = [] }: IProps) {
  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart width={730} height={250} data={items} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <YAxis domain={[0, 'dataMax']} style={{ fontSize: 10 }} />
          <XAxis dataKey="status" style={{ fontSize: 10 }} />
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(189, 195, 199,0.5)" />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#AEE6E6" fillOpacity={0.6} fill="#3AB0FF" />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 65%;
  height: 300px;
`;

export default OrderStatusAreaChart;
