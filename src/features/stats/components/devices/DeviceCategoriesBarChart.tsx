import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { categoryStatsSelector } from '../../selectors/categoryStatsSelector';

function DeviceCategoriesBarChart() {
  const items = useTypedSelector(categoryStatsSelector);

  return (
    <Wrapper data-component="categories-bar-chart">
      <InnerWrapper>
        <ResponsiveContainer>
          <AreaChart data={items} syncId="deviceCategoriesId" margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </InnerWrapper>

      <InnerWrapper>
        <ResponsiveContainer>
          <AreaChart data={items} syncId="deviceCategoriesId" margin={margin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="quantity" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </InnerWrapper>
    </Wrapper>
  );
}

const margin = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};

const Wrapper = styled.div`
  min-height: 300px;
  height: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  @media (max-width: 1000px) {
    flex-direction: column;
    height: 600px;
    padding: 0 15px;
    margin-bottom: 10px;
  }
`;

const InnerWrapper = styled.div`
  width: 50%;
  min-height: 300px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export default DeviceCategoriesBarChart;
