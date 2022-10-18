import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  Cell,
  PieChart,
  Pie,
  Sector,
  AreaChart,
  Area,
} from 'recharts';
import styled from 'styled-components';

import { Stats } from '@src/common/api/Api';
import { OrderStatusValues } from '@src/features/orders/types';
import interpolateColors from '@src/common/utils/interpolateColors';
import { OrderStatusColor } from '@src/features/orders/constants';

interface IDeviceStats {
  brandId: number;
  id: number;
  name: string;
  quantity: number;
  typeId: number;
}

interface IStatusStats {
  quantity: number;
  status: OrderStatusValues;
}

interface ICategoriesStats {
  name: string;
  typeId: string;
  total: number;
  quantity: number;
}

interface IStats {
  devices: IDeviceStats[];
  status: IStatusStats[];
  categories: ICategoriesStats[];
}

function StatsView() {
  const [stats, setStats] = useState<IStats | undefined>();

  useEffect(() => {
    Stats.get().then((res) => {
      setStats(res.data.stats);
    });
  }, []);

  return (
    <Container>
      <OrderDeviceBarChart items={stats?.devices} />
      <StatusStatsWrapper>
        <OrderStatusPie items={stats?.status} />
        <OrderStatusAreaChart items={stats?.status} />
      </StatusStatsWrapper>
      <DeviceCategoriesBarChart items={stats?.categories} />
    </Container>
  );
}

const StatusStatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
}
`;

const Wrapper = styled.div`
  height: 300px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

function OrderDeviceBarChart({ items = [] }: { items?: IDeviceStats[] }) {
  const colors = interpolateColors(items.length);

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={items}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fontSize: 10 }} />
          <YAxis dataKey="quantity" style={{ fontSize: 10 }} />
          <Tooltip />
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

interface IActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: IStatusStats;
  percent: number;
}

const renderActiveShape = (props: IActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.status}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const PieWrapper = styled.div`
  width: 30%;
  height: 300px;
`;

function OrderStatusPie({ items = [] }: { items: IStatusStats[] | undefined }) {
  const [activeIndex, setActiveIdx] = useState<number>(0);

  const colors = items.map((item) => OrderStatusColor[item.status]);

  const onPieEnter = (_, index: number) => {
    setActiveIdx(index);
  };

  return (
    <PieWrapper>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={items}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey="total"
            paddingAngle={1}
            onMouseEnter={onPieEnter}
          >
            {items.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </PieWrapper>
  );
}

function OrderStatusAreaChart({ items = [] }: { items?: IStatusStats[] }) {
  return (
    <AreaChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={730} height={250} data={items} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <YAxis domain={[0, 'dataMax']} style={{ fontSize: 10 }} />
          <XAxis dataKey="status" style={{ fontSize: 10 }} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </AreaChartWrapper>
  );
}

const AreaChartWrapper = styled.div`
  width: 65%;
  height: 300px;
`;

const CategoriesBarChartWrapper = styled.div`
  height: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

function DeviceCategoriesBarChart({ items = [] }: { items?: ICategoriesStats[] }) {
  return (
    <CategoriesBarChartWrapper>
      <ResponsiveContainer width="45%">
        <AreaChart
          data={items}
          syncId="anyId"
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
          syncId="anyId"
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
    </CategoriesBarChartWrapper>
  );
}

export default StatsView;
