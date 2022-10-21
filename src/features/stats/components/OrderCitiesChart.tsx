import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ICitiesStats } from '../types';

interface IProps {
  items?: ICitiesStats[];
}

function OrderCitiesChart({ items }: IProps) {
  return (
    <div style={{ height: 300 }}>
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
          <XAxis dataKey="city" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#24A19C" fill="#24A19C" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderCitiesChart;
