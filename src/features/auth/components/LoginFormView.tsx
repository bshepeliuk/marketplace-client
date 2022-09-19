import React from 'react';
import { useFormik } from 'formik';
import useLogin from '@src/features/auth/hooks/useLogin';
import { ILogin } from '@src/common/types/apiTypes';
import CustomInput from '@common/components/CustomInput/CustomInput';
import { LoginForm, LoginButton } from '../styles/login.styled';
import { LoginSchema } from '../validation/authSchema';

const initialValues: ILogin = {
  email: '',
  password: '',
};

function LoginFormView() {
  const { onLogin, isLoading } = useLogin();
  const formik = useFormik<ILogin>({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      onLogin({ email, password });
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty) || isLoading;

  return (
    <LoginForm onSubmit={formik.handleSubmit}>
      <CustomInput id="email" label="Email" fieldName="email" type="text" {...formik} />
      <CustomInput id="password" label="Password" fieldName="password" type="password" {...formik} />

      <LoginButton type="submit" disabled={isDisabled}>
        {isLoading ? 'Processing...' : 'Login'}
      </LoginButton>
    </LoginForm>
  );
}

export default LoginFormView;
