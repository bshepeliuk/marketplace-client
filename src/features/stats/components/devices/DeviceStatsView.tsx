import React from 'react';

import DeviceCategoriesBarChart from './DeviceCategoriesBarChart';
import DevicesBarChart from './DevicesBarChart';

function DeviceStatsView() {
  return (
    <>
      <DevicesBarChart />
      <DeviceCategoriesBarChart />
    </>
  );
}

export default DeviceStatsView;
