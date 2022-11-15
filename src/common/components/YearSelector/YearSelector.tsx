import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { ActionMeta, SingleValue, StylesConfig } from 'react-select';

import { Option } from '@src/common/types/selectTypes';

interface IYearSelectorProps {
  onFilterChange: (filters: { year?: string }) => void;
  onLoadYearOptions: () => Promise<Option[]>;
  initialValue: string | null;
}

function YearSelector({ onFilterChange, onLoadYearOptions, initialValue }: IYearSelectorProps) {
  const [yearOption, setYearOption] = useState<Option | null>();

  const onChange = (option: SingleValue<Option>, meta: ActionMeta<Option>) => {
    onFilterChange({ year: option?.value });
    setYearOption(option);
  };

  const loadOptions = () => {
    return onLoadYearOptions().then((options) => {
      setInitOptionRelyOnPossibleOptions(options);
      return options;
    });
  };

  const setInitOptionRelyOnPossibleOptions = (options: Option[]) => {
    if (initialValue !== undefined) {
      const option = options.find((item) => Number(item.value) === Number(initialValue));
      if (option !== undefined) setYearOption(option);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isClearable
      menuPosition="fixed"
      styles={selectorStyles}
      loadOptions={loadOptions}
      placeholder="Select order year."
      value={yearOption}
      onChange={onChange}
    />
  );
}

const selectorStyles: StylesConfig<Option, false> = {
  container: (styles) => ({ ...styles, minWidth: 160, width: 'max-content' }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: '0 !important',
    width: '100%',
  }),
  placeholder: (styles) => ({ ...styles, fontSize: 15, whiteSpace: 'nowrap' }),
};

export default YearSelector;
