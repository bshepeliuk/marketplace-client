import { FormikProps } from 'formik';
import React from 'react';
import Select, {
  StylesConfig,
  ActionMeta,
  SingleValue,
  MultiValue,
  GroupBase,
} from 'react-select';

import styled from 'styled-components';

const Wrap = styled.div`
  padding-bottom: 5px;
`;

const Label = styled.label`
  color: rgba(149, 165, 166, 1);
`;

interface ISelectorState {
  isClearable: boolean;
  isSearchable: boolean;
  isDisabled: boolean;
  isLoading: boolean;
}

interface ICustomSelectProps {
  formikProps: FormikProps<any>;
  fieldName: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  selectorState?: ISelectorState;
  placeholder?: string;
}

interface Option {
  readonly label: string;
  readonly value: string;
}

const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
  option: (provided, state) => ({
    ...provided,
    padding: 20,
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: state.isSelected
      ? 'rgba(26, 188, 156, 0.6)'
      : state.isFocused
      ? 'rgba(189, 195, 199, 0.2)'
      : undefined,
  }),
  control: (provided) => ({
    ...provided,
    height: 30,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    boxShadow: 'none',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  placeholder: (base) => ({
    ...base,
    color: 'rgba(189, 195, 199,0.9)',
  }),
};

const createOption = (label: string) => ({
  label,
  value: label,
});

function CustomSelect({
  formikProps,
  selectorState,
  placeholder,
  fieldName,
  label,
  options,
}: ICustomSelectProps) {
  const { values, setFieldValue, handleReset } = formikProps;

  const isClearable = selectorState?.isClearable ?? true;
  const isDisabled = selectorState?.isDisabled ?? false;
  const isLoading = selectorState?.isLoading ?? false;
  const hasValue = values[fieldName] && values[fieldName] !== '';

  const value = hasValue ? createOption(values[fieldName]) : undefined;

  const handleChange = (
    option: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    if (actionMeta.action === 'clear') {
      handleReset();
      return;
    }

    if (option === null) return;

    if ('value' in option) {
      setFieldValue(fieldName, option.value);
    }
  };

  return (
    <Wrap>
      <Label htmlFor={fieldName}>{label}</Label>
      <Select
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        inputId={fieldName}
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        value={value}
      />
    </Wrap>
  );
}

export default CustomSelect;
