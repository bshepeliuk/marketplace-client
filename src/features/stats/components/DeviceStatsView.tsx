import React from 'react';

import DeviceCategoriesBarChart from './DeviceCategoriesBarChart';
import OrderDeviceBarChart from './OrderDeviceBarChart';

function DeviceStatsView() {
  return (
    <>
      <OrderDeviceBarChart />
      <DeviceCategoriesBarChart />
    </>
  );
}

export default DeviceStatsView;
