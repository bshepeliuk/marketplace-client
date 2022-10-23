import React from 'react';

import OrderCitiesChart from './OrderCitiesChart';
import OrderCustomerBarChart from './OrderCustomerBarChart';

function CustomerStatsView() {
  return (
    <>
      <OrderCustomerBarChart />
      <OrderCitiesChart />
    </>
  );
}

export default CustomerStatsView;
