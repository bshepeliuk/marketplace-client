import React from 'react';
import { useFormik } from 'formik';
import useLogin from '@src/features/auth/hooks/useLogin';
import { ILogin } from '@src/common/types/apiTypes';
import CustomInput from '@common/components/CustomInput/CustomInput';
import { LoginForm } from '../styles/login.styled';
import { LoginSchema } from '../validation/authSchema';

const initialValues: ILogin = {
  email: '',
  password: '',
};

function LoginFormView() {
  const { onLogin } = useLogin();
  const formik = useFormik<ILogin>({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      return onLogin({ email, password });
    },
  });

  return (
    <LoginForm onSubmit={formik.handleSubmit}>
      <CustomInput
        id="email"
        label="Email"
        fieldName="email"
        type="text"
        {...formik}
      />

      <CustomInput
        id="password"
        label="Password"
        fieldName="password"
        type="password"
        {...formik}
      />

      <button type="submit">Login</button>
    </LoginForm>
  );
}

export default LoginFormView;
