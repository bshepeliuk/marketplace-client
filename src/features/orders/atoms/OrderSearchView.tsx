import React, { ChangeEvent, useRef, useState } from 'react';
import notifications from '@src/common/utils/notifications';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { SearchContainer, SearchInput } from '../styles/orderSearchFilter';
import { ISearchOption } from '../types';

interface IProps {
  onFilterChange: (filters: Record<string, string>) => void;
  initialValue: (string | undefined)[];
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

function OrderSearchView({ onFilterChange, options, validation, errors, initialValue }: IProps) {
  const [keyName, keyValue] = initialValue;

  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOption, setSearchOption] = useState<ISearchOption>(getInitialOptions());
  const [searchValue, setSearchValue] = useState(getInitialSearchValue());

  const placeholder = `Search by ${searchOption.value.toLowerCase()}`;

  const emptyFilters = options.reduce((prev, current) => ({ ...prev, [current.fieldName]: undefined }), {});

  const handleOptionChange = (option: SingleValue<ISearchOption>) => {
    if (option !== null) {
      setSearchOption(option);
      setSearchValue('');
      onFilterChange(emptyFilters);
    }

    onInputFocus();
  };

  const onSearchValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;

    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);

    const isValid = validateSearchInput({ fieldName: name, value });
    const isNotValid = !isValid;

    if (isNotValid) return;

    setSearchValue(value);

    timeoutId.current = setTimeout(() => {
      onFilterChange({ ...emptyFilters, [searchOption.fieldName]: value });
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

  const onInputFocus = () => {
    inputRef.current?.focus();
  };

  function getInitialOptions() {
    return options.find((item) => item.fieldName === keyName) ?? options[0];
  }

  function getInitialSearchValue() {
    return keyValue ?? '';
  }

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
