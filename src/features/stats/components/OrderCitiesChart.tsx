import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cityStatsSelector } from '../selectors/cityStatsSelector';

function OrderCitiesChart() {
  const items = useTypedSelector(cityStatsSelector);

  if (items === undefined) return null;

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
