import React from 'react';
import { useFormik } from 'formik';
import useRegister from '@src/features/auth/hooks/useRegister';
import { IRegister, ROLE } from '@src/common/types/apiTypes';
import CustomInput from '@common/components/CustomInput/CustomInput';
import CustomSelect from '@common/components/CustomSelect/CustomSelect';
import { RegisterButton, RegistrationForm } from '../styles/register.styled';
import { RegistrationSchema } from '../validation/authSchema';

interface IRegisterFormValues extends IRegister {
  passwordConfirmation: string;
}

const initialValues = {
  fullName: '',
  password: '',
  passwordConfirmation: '',
  email: '',
  role: ROLE.BUYER,
};

const ROLE_OPTIONS = [
  { value: ROLE.BUYER, label: 'buyer' },
  { value: ROLE.SELLER, label: 'seller' },
];
// TODO: add selector for role field
function RegisterFormView() {
  const { onRegister } = useRegister();
  const formik = useFormik<IRegisterFormValues>({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: ({ email, password, role, fullName }) => {
      return onRegister({ email, password, role, fullName });
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty);

  return (
    <RegistrationForm onSubmit={formik.handleSubmit}>
      <CustomInput
        id="fullName"
        label="Full Name"
        fieldName="fullName"
        type="text"
        {...formik}
      />

      <CustomInput
        id="email"
        label="Email"
        fieldName="email"
        type="email"
        {...formik}
      />

      <CustomSelect
        formikProps={formik}
        options={ROLE_OPTIONS}
        fieldName="role"
        label="Role"
      />

      <CustomInput
        id="password"
        label="Password"
        fieldName="password"
        type="password"
        {...formik}
      />

      <CustomInput
        id="passwordConfirmation"
        label="Password confirmation"
        fieldName="passwordConfirmation"
        type="password"
        {...formik}
      />

      <RegisterButton type="submit" disabled={isDisabled}>
        Register
      </RegisterButton>
    </RegistrationForm>
  );
}

export default RegisterFormView;
