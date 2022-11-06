import React, { useState } from 'react';
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, TooltipProps, XAxis, YAxis, ZAxis } from 'recharts';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Nullable } from '@src/common/types/baseTypes';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { orderTimeStatsSelector } from '../../selectors/orderTimeStatsSelector';
import { weekdays } from '../../constants';
import { IOrderTimeStats } from '../../types';

function OrderTimeScatterChart() {
  const items = useTypedSelector(orderTimeStatsSelector);

  const hasNoItems = items === undefined;

  if (hasNoItems) return null;

  return (
    <Container>
      {weekdays.map((dayLabel, dayIdx) => {
        const isLastDay = weekdays.length - 1 === dayIdx;

        return <ScatterItem key={dayLabel} dayLabel={dayLabel} dayData={items[dayLabel]} isLastDay={isLastDay} />;
      })}
    </Container>
  );
}

interface IProps {
  dayLabel: string;
  isLastDay: boolean;
  dayData: IOrderTimeStats[];
}

function ScatterItem({ dayLabel, isLastDay, dayData }: IProps) {
  const [position, setPosition] = useState<Nullable<{ x: number; y: number }>>(null);

  const capitalizedDayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
  const tickLineOptions = { transform: 'translate(0, -6)' };
  const yAxisLabelOptions = { value: capitalizedDayLabel, position: 'insideRight' };

  const range = [16, 225];
  const margin = {
    top: 10,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const TOOLTIP_WIDTH = 150;

  const calculateTooltipPosition = () => {
    if (position === null) return;

    const X_OFFSET = 5;
    const Y_OFFSET = 5;

    const xPosition = position.x + TOOLTIP_WIDTH;

    if (xPosition > window.innerWidth) {
      return {
        x: position.x - TOOLTIP_WIDTH - X_OFFSET,
        y: position.y + Y_OFFSET,
      };
    }

    return undefined;
  };

  const onDotMouseOver = (data: { x: number; y: number }) => {
    setPosition({ x: Math.floor(data.x), y: Math.floor(data.y) });
  };

  return (
    <ResponsiveContainer key={dayLabel} width="100%" height={60} minWidth={1024}>
      <ScatterChart margin={margin} data={dayData}>
        <XAxis
          type="category"
          dataKey="hour"
          name="hour"
          interval={0}
          tick={isLastDay}
          tickLine={tickLineOptions}
          tickFormatter={(tick) => `${tick}h`}
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
          position={calculateTooltipPosition()}
          content={CustomTooltip}
          cursor={{ strokeDasharray: '3 3' }}
          wrapperStyle={{ zIndex: 100, outline: 'none' }}
        />
        <Scatter onMouseOver={onDotMouseOver} fill="#98A8F8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip(props: TooltipProps<ValueType, NameType>) {
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
}

const Container = styled.div`
  width: 100%;
  padding: 50px 0 100px 0;
`;

const TooltipContainer = styled.div`
  background-color: #fff;
  border: 1px solid #999;
  margin: 0;
  padding: 10px;
  border-radius: 4px;
  width: 150px;
`;

export default OrderTimeScatterChart;
