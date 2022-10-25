import React from 'react';
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, TooltipProps, XAxis, YAxis, ZAxis } from 'recharts';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { orderMonthStatsSelector } from '../../selectors/orderMonthStatsSelector';
import { weekdays } from '../../constants';

function OrderMonthScatterChart() {
  const items = useTypedSelector(orderMonthStatsSelector);

  const range = [16, 225];
  const margin = {
    top: 10,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const hasNoItems = items === undefined;

  if (hasNoItems) return null;

  return (
    <Container>
      {weekdays.map((dayLabel, dayIdx) => {
        const isLastDay = weekdays.length - 1 === dayIdx;
        const capitalizedDayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
        const yAxisLabelOptions = { value: capitalizedDayLabel, position: 'insideRight' };
        const tickLineOptions = { transform: 'translate(0, -6)' };

        return (
          <ResponsiveContainer key={dayLabel} width="100%" height={60}>
            <ScatterChart margin={margin}>
              <XAxis
                type="category"
                dataKey="month"
                name="month"
                interval={0}
                tick={isLastDay}
                tickLine={tickLineOptions}
              />
              <YAxis
                type="number"
                dataKey="index"
                name={dayLabel}
                height={10}
                width={80}
                tick={false}
                tickLine={false}
                axisLine={false}
                label={yAxisLabelOptions}
              />
              <ZAxis type="number" dataKey="quantity" range={range} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                wrapperStyle={{ zIndex: 100, outline: 'none' }}
                content={CustomTooltip}
              />
              <Scatter data={items[dayLabel]} fill="#9896F1" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      })}
    </Container>
  );
}

function CustomTooltip(props: TooltipProps<ValueType, NameType>) {
  const { active, payload } = props;

  const hasTooltip = active && payload && payload.length !== 0;

  if (hasTooltip) {
    const data = payload[0] && payload[0].payload;

    return (
      <TooltipContainer>
        <p>
          <span>month: </span>
          {data.month}
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
  border-radius: 4px;
`;

export default OrderMonthScatterChart;
