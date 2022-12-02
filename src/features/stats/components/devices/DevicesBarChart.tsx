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
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { deviceStatsSelector } from '../../selectors/deviceStatsSelector';

function DevicesBarChart() {
  const items = useTypedSelector(deviceStatsSelector);
  const colors = interpolateColors(items?.length ?? 0);

  if (items === undefined) return null;

  return (
    <Wrapper data-component="devices-bar-chart">
      <ResponsiveContainer>
        <BarChart data={items} margin={margin}>
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

const margin = {
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
};

export default DevicesBarChart;
