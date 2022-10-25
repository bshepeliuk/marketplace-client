import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';

import { Option } from '@src/common/types/selectTypes';

interface IYearSelectorProps {
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
  onLoadYearOptions: () => Promise<Option[]>;
}

function YearSelector({ onFilterChange, onLoadYearOptions }: IYearSelectorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [yearOption, setYearOption] = useState<Option | null>(null);

  const onChange = (option: SingleValue<Option>, meta: ActionMeta<Option>) => {
    if (meta.action === 'clear') {
      searchParams.delete('year');
    }

    if (meta.action === 'select-option' && option !== null) {
      searchParams.set('year', option.value);
    }

    const filters = getOrderFilterParams();

    onFilterChange(filters);
    setYearOption(option);
    setSearchParams(searchParams);
  };

  const loadOptions = () => {
    return onLoadYearOptions();
  };

  const getOrderFilterParams = () => [...searchParams.entries()].filter(([key]) => key !== 'page');

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isClearable
      styles={selectorStyles}
      loadOptions={loadOptions}
      placeholder="Select order year."
      value={yearOption}
      onChange={onChange}
    />
  );
}

const selectorStyles: StylesConfig<Option, false> = {
  container: (styles) => ({ ...styles, minWidth: 150, width: 'max-content' }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: '0 !important',
    width: '100%',
  }),
  placeholder: (styles) => ({ ...styles, fontSize: 15 }),
};

export default YearSelector;
