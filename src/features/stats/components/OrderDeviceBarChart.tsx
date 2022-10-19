import React from 'react';
import styled from 'styled-components';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import interpolateColors from '@src/common/utils/interpolateColors';
import { IDeviceStats } from '../types';

interface IProps {
  items?: IDeviceStats[];
}

function OrderDeviceBarChart({ items = [] }: IProps) {
  const colors = interpolateColors(items.length);

  return (
    <Wrapper>
      <ResponsiveContainer>
        <BarChart
          data={items}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(189, 195, 199,0.5)" />
          <XAxis dataKey="name" style={{ fontSize: 10 }} />
          <YAxis dataKey="quantity" style={{ fontSize: 10 }} />
          <Tooltip cursor={{ fill: 'rgba(149, 165, 166,0.2)' }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />

          <Bar dataKey="quantity" minPointSize={3}>
            {items.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={colors[idx]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 300px;
`;

export default OrderDeviceBarChart;
