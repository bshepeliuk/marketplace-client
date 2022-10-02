import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { useSearchParams } from 'react-router-dom';
import createOption from '@src/common/utils/createSelectOption';
import { ORDERS_LIMIT } from '../../constants';
import useGetOrders from '../../hooks/useGetOrders';
import { SearchContainer, SearchInput } from '../../styles/orderSearchFilter';

interface ISearchOption {
  label: string;
  value: string;
  fieldName: string;
}

function OrderSearchView() {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [searchOption, setSearchOption] = useState<ISearchOption>(searchFieldOptions[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const { fetchOrders } = useGetOrders();

  const searchOrderFields = searchFieldOptions.map((item) => item.fieldName);
  const FIRST_PAGE = 1;
  const pageParam = Number(searchParams.get('page'));
  const offset = pageParam > FIRST_PAGE ? (pageParam - FIRST_PAGE) * ORDERS_LIMIT : 0;
  const placeholder = `Search by ${searchOption.value.toLowerCase()}`;

  useEffect(() => {
    for (const key of searchOrderFields) {
      const hasOrderParams = searchParams.has(key);

      if (hasOrderParams) {
        const option = searchFieldOptions.find((item) => item.fieldName === key);

        if (option) {
          setSearchOption(option);
        }

        const newSearchValue = searchParams.get(key) ?? '';

        setSearchValue(newSearchValue);
      }
    }
  }, []);

  const handleOptionChange = (option: SingleValue<ISearchOption>) => {
    // FIXME: remove previous option;
    if (option !== null) {
      setSearchOption(option);
    }
  };

  const onSearchValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);

    setSearchValue(evt.target.value);
    searchParams.set(searchOption.fieldName, evt.target.value);
    setSearchParams(searchParams);

    fetchOrders({
      limit: ORDERS_LIMIT,
      offset,
      filters: [...searchParams.entries()].filter(([key]) => key !== 'page'), // TODO: create helper;
    });
  };

  return (
    <SearchContainer>
      <Select
        value={searchOption}
        options={searchFieldOptions}
        styles={searchFieldStyles}
        onChange={handleOptionChange}
      />

      <SearchInput type="text" onChange={onSearchValueChange} placeholder={placeholder} value={searchValue} />
    </SearchContainer>
  );
}

const searchFieldOptions = [
  { ...createOption('Order id'), fieldName: 'id' },
  { ...createOption('Customer'), fieldName: 'fullName' },
  { ...createOption('Phone'), fieldName: 'phone' },
];

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
