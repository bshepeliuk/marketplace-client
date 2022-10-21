import React from 'react';

import { IStats } from '../types';
import OrderCitiesChart from './OrderCitiesChart';
import OrderCustomerBarChart from './OrderCustomerBarChart';

interface IProps {
  stats?: IStats;
}

function CustomerStatsView({ stats }: IProps) {
  return (
    <>
      <OrderCustomerBarChart items={stats?.customers} />
      <OrderCitiesChart items={stats?.cities} />
    </>
  );
}

export default CustomerStatsView;
