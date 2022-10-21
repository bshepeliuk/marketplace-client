import React from 'react';

import { IStats } from '../types';
import DeviceCategoriesBarChart from './DeviceCategoriesBarChart';
import OrderDeviceBarChart from './OrderDeviceBarChart';

interface IProps {
  stats?: IStats;
}

function DeviceStatsView({ stats }: IProps) {
  return (
    <>
      <OrderDeviceBarChart items={stats?.devices} />
      <DeviceCategoriesBarChart items={stats?.categories} />
    </>
  );
}

export default DeviceStatsView;
