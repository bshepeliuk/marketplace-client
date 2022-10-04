import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import { searchOrderOptions } from '../constants';
import { SearchContainer, SearchInput } from '../styles/orderSearchFilter';
import useGetPrevSearchOrderOption from '../hooks/useGetPrevSearchOrderOption';
import { ISearchOption } from '../types';

interface IProps {
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
}

function OrderSearchView({ onFilterChange }: IProps) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [searchOption, setSearchOption] = useState<ISearchOption>(searchOrderOptions[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const { getPrevSearchOptionFromParams } = useGetPrevSearchOrderOption();

  const placeholder = `Search by ${searchOption.value.toLowerCase()}`;

  useEffect(() => {
    // sync search state with params;
    const option = getPrevSearchOptionFromParams(searchOrderOptions);

    if (option) {
      const prevSearchValue = searchParams.get(option.fieldName) ?? '';

      setSearchValue(prevSearchValue);
      setSearchOption(option);
    }
  }, []);

  const handleOptionChange = (option: SingleValue<ISearchOption>) => {
    const prevOption = getPrevSearchOptionFromParams(searchOrderOptions);

    if (prevOption !== undefined) {
      searchParams.delete(prevOption.fieldName);
    }

    if (option !== null) {
      setSearchOption(option);
      setSearchValue('');
    }

    setSearchParams(searchParams);
  };

  const onSearchValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    // FIXME: allow only number for orderId (id);
    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
    searchParams.delete('page');

    if (value.trim() === '') {
      searchParams.delete(searchOption.fieldName);
    } else {
      searchParams.set(searchOption.fieldName, value);
    }

    setSearchValue(value);
    setSearchParams(searchParams);

    timeoutId.current = setTimeout(() => {
      const filters = getOrderFilterParams();

      onFilterChange(filters);
    }, 1500);
  };

  const getOrderFilterParams = () => [...searchParams.entries()].filter(([key]) => key !== 'page');

  return (
    <SearchContainer>
      <Select
        value={searchOption}
        options={searchOrderOptions}
        styles={searchFieldStyles}
        onChange={handleOptionChange}
      />

      <SearchInput type="text" onChange={onSearchValueChange} placeholder={placeholder} value={searchValue} />
    </SearchContainer>
  );
}

const searchFieldStyles: StylesConfig<ISearchOption, false> = {
  container: (styles) => ({
    ...styles,
    width: 150,
  }),
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '4px 0 0 4px',
    boxShadow: '0 !important',
  }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({
    ...styles,
    textTransform: 'uppercase',
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#34495e',
    letterSpacing: '1px',
  }),
};

export default OrderSearchView;
