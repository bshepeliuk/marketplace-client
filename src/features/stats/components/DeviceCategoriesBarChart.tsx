import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { ICategoriesStats } from '../types';

interface IProps {
  items?: ICategoriesStats[];
}

function DeviceCategoriesBarChart({ items = [] }: IProps) {
  return (
    <Wrapper>
      <ResponsiveContainer width="45%">
        <AreaChart
          data={items}
          syncId="deviceCategoriesId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="45%">
        <AreaChart
          data={items}
          syncId="deviceCategoriesId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="quantity" stroke="#82ca9d" fill="#82ca9d" />
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

export default DeviceCategoriesBarChart;
