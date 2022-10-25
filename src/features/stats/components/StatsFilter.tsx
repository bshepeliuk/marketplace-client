import React from 'react';
import { ParamKeyValuePair } from 'react-router-dom';

import { Orders } from '@src/common/api/Api';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import YearSelector from '@src/common/components/YearSelector/YearSelector';
import useFetchStats from '../hooks/useFetchStats';

function StatsFilter() {
  const { fetchStats } = useFetchStats();

  const onLoadYearOptions = () => {
    return Orders.getYearOptions().then((res) => res.data.options);
  };

  const onFilterChange = (filters: ParamKeyValuePair[]) => {
    fetchStats({ filters });
  };

  return (
    <>
      <MonthFilter onFilterChange={onFilterChange} />
      <YearSelector onFilterChange={onFilterChange} onLoadYearOptions={onLoadYearOptions} />
    </>
  );
}

export default StatsFilter;
