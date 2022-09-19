import React from 'react';
import { useFormik } from 'formik';
import useRegister from '@src/features/auth/hooks/useRegister';
import { IRegister } from '@src/common/types/apiTypes';
import { ROLES } from '@src/common/constants';
import { useNavigate } from 'react-router-dom';
import notifications from '@common/utils/notifications';
import { routes } from '@src/app/Router';
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
  role: ROLES.BUYER,
};

const ROLE_OPTIONS = [
  { value: ROLES.BUYER, label: 'buyer' },
  { value: ROLES.SELLER, label: 'seller' },
];

function RegisterFormView() {
  const { onRegister, isLoading } = useRegister();
  const navigate = useNavigate();
  const formik = useFormik<IRegisterFormValues>({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: async ({ email, password, role, fullName }) => {
      await onRegister({ email, password, role, fullName });

      navigate(routes.login);
      notifications.success('You have created an account successfully!');
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty) || isLoading;

  return (
    <RegistrationForm onSubmit={formik.handleSubmit}>
      <CustomInput id="fullName" label="Full Name" fieldName="fullName" type="text" {...formik} />

      <CustomInput id="email" label="Email" fieldName="email" type="email" {...formik} />

      <CustomSelect
        formikProps={formik}
        options={ROLE_OPTIONS}
        fieldName="role"
        placeholder="Please select role..."
        label="Role"
      />

      <CustomInput id="password" label="Password" fieldName="password" type="password" {...formik} />

      <CustomInput
        id="passwordConfirmation"
        label="Password confirmation"
        fieldName="passwordConfirmation"
        type="password"
        {...formik}
      />

      <RegisterButton type="submit" disabled={isDisabled}>
        {isLoading ? 'Processing...' : 'Register'}
      </RegisterButton>
    </RegistrationForm>
  );
}

export default RegisterFormView;
