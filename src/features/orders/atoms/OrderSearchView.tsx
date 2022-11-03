import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import notifications from '@src/common/utils/notifications';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { ParamKeyValuePair, useSearchParams } from 'react-router-dom';
import { SearchContainer, SearchInput } from '../styles/orderSearchFilter';
import useGetPrevSearchOrderOption from '../hooks/useGetPrevSearchOrderOption';
import { ISearchOption } from '../types';

interface IProps {
  onFilterChange: (filters: ParamKeyValuePair[]) => void;
  options: ISearchOption[];
  validation?: {
    [key: string]: (value: string | number) => boolean;
  };
  errors?: {
    [key: string]: {
      message: string;
    };
  };
}

function OrderSearchView({ onFilterChange, options, validation, errors }: IProps) {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOption, setSearchOption] = useState<ISearchOption>(options[0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const { getPrevSearchOptionFromParams } = useGetPrevSearchOrderOption();

  const placeholder = `Search by ${searchOption.value.toLowerCase()}`;

  useEffect(() => {
    // sync search state with params;
    const option = getPrevSearchOptionFromParams(options);

    if (option) {
      const prevSearchValue = searchParams.get(option.fieldName) ?? '';

      setSearchValue(prevSearchValue);
      setSearchOption(option);
    }
  }, []);

  const handleOptionChange = (option: SingleValue<ISearchOption>) => {
    const prevOption = getPrevSearchOptionFromParams(options);

    if (prevOption !== undefined) {
      searchParams.delete(prevOption.fieldName);
    }

    if (option !== null) {
      setSearchOption(option);
      setSearchValue('');
    }

    setSearchParams(searchParams);
    onInputFocus();
  };

  const onSearchValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;

    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
    searchParams.delete('page');

    const isValueEmpty = value.trim() === '';
    const isValid = validateSearchInput({ fieldName: name, value });

    if (!isValid) return;

    if (isValueEmpty) {
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

  const validateSearchInput = ({ fieldName, value }: { fieldName: string; value: string }) => {
    const hasValidationMethod = validation && validation[fieldName] !== undefined;

    if (hasValidationMethod) {
      const isValid = validation[fieldName](value);
      const hasValidationError = !isValid && errors && errors[fieldName] !== undefined;

      if (hasValidationError) {
        notifications.error(errors[fieldName].message, { toastId: 'orders-validation-error' });
        return false;
      }
    }

    return true;
  };

  const getOrderFilterParams = () => {
    searchParams.delete('page');
    setSearchParams(searchParams);

    return Array.from(searchParams.entries());
  };

  const onInputFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <SearchContainer>
      <Select value={searchOption} options={options} styles={searchFieldStyles} onChange={handleOptionChange} />

      <SearchInput
        type="text"
        ref={inputRef}
        name={searchOption.fieldName}
        onChange={onSearchValueChange}
        placeholder={placeholder}
        value={searchValue}
      />
    </SearchContainer>
  );
}

const searchFieldStyles: StylesConfig<ISearchOption, false> = {
  container: (styles) => ({
    ...styles,
    width: 'max-content',
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
