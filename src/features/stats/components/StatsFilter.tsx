import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Orders } from '@src/common/api/Api';
import MonthFilter from '@src/common/components/MonthFilter/MonthFilter';
import getNextSearchParams from '@src/common/utils/getNextSearchParams';
import YearSelector from '@src/common/components/YearSelector/YearSelector';
import convertFiltersToParamKeyValuePair from '@src/common/utils/convertFiltersToParamKeyValuePair';
import useFetchStats from '../hooks/useFetchStats';

type Filters = Record<string, string | number | string[] | number[]>;

function StatsFilter() {
  const { fetchStats } = useFetchStats();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMonthValues = Array.from(searchParams.getAll('month').values()).map(Number);
  const initialYearValue = searchParams.get('year');

  const onLoadYearOptions = () => {
    return Orders.getYearOptions().then((res) => res.data.options);
  };

  const onFilterChange = (filters: Filters) => {
    searchParams.delete('page');

    const prevParams = Array.from(searchParams.entries());
    const newParams = convertFiltersToParamKeyValuePair(filters);
    const nextParams = getNextSearchParams({ prev: prevParams, next: newParams });

    setSearchParams(nextParams);
    fetchStats({ filters: nextParams });
  };

  return (
    <>
      <MonthFilter onFilterChange={onFilterChange} initialValues={initialMonthValues} />
      <YearSelector
        onFilterChange={onFilterChange}
        onLoadYearOptions={onLoadYearOptions}
        initialValue={initialYearValue}
      />
    </>
  );
}

export default StatsFilter;
