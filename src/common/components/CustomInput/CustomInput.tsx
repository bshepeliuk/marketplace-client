/* eslint-disable max-len */
import { FormikProps, FormikValues } from 'formik';
import React from 'react';
import {
  ErrorWrapper,
  InnerWrapper,
  Wrapper,
  Label,
} from './customInput.styled';

interface IInputProps {
  id: string;
  label: string;
  fieldName: string;
  type: 'text' | 'password' | 'email';
}

function CustomInput({ label, fieldName, type, id, ...props }: IInputProps) {
  // prettier-ignore
  const { errors, touched, values, handleChange, handleBlur } = props as FormikProps<FormikValues>;

  const hasError = touched[fieldName] && errors[fieldName];

  return (
    <Wrapper>
      {label && <Label htmlFor={label}>{label}</Label>}

      <InnerWrapper>
        <input
          id={id}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[fieldName]}
        />

        {hasError && <ErrorWrapper>{errors[fieldName]}</ErrorWrapper>}
      </InnerWrapper>
    </Wrapper>
  );
}

export default CustomInput;