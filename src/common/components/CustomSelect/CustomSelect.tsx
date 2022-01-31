import React from 'react';
import Select, { StylesConfig } from 'react-select';
import styled from 'styled-components';

const Wrap = styled.div`
  padding-bottom: 5px;
`;

const Label = styled.label`
  color: rgba(149, 165, 166, 1);
`;

function CustomSelect({
  formikProps: { values, touched, errors, setFieldValue },
  fieldName,
  label,
  options,
}: any) {
  const customStyles: StylesConfig = {
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

  return (
    <Wrap>
      <Label htmlFor={fieldName}>{label}</Label>
      <Select
        inputId={fieldName}
        styles={customStyles}
        options={options}
        defaultValue={values[fieldName]}
        onChange={(evt: any) => setFieldValue(fieldName, evt.value)}
        placeholder="Please select role"
      />

      {errors.role && touched.role && <div>{errors.role}</div>}
    </Wrap>
  );
}

export default CustomSelect;
