import React from 'react';
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, TooltipProps, XAxis, YAxis, ZAxis } from 'recharts';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { orderTimeStatsSelector } from '../selectors/orderTimeStatsSelector';

function OrderTimeScatterChart() {
  const items = useTypedSelector(orderTimeStatsSelector);

  const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <TooltipContainer>
          <p>
            <span>hour: </span>
            {data.hour}
          </p>
          <p>
            <span>total: </span>
            {data.total} USD
          </p>
          <p>
            <span>quantity: </span>
            {data.quantity}
          </p>
        </TooltipContainer>
      );
    }

    return null;
  };

  const range = [16, 225];

  if (items === undefined) return null;

  return (
    <Container>
      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="sunday"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Sunday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.sunday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Monday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.monday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Tuesday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.tuesday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Wednesday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.wednesday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Thursday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.thursday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Friday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.friday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tickFormatter={(tick) => `${tick}h`}
            tickLine={{ transform: 'translate(0, -6)' }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Saturday', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="quantity" range={range} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
          <Scatter data={items.saturday} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 50px 0;
`;

const TooltipContainer = styled.div`
  background-color: #fff;
  border: 1px solid #999;
  margin: 0;
  padding: 10px;
`;

export default OrderTimeScatterChart;
