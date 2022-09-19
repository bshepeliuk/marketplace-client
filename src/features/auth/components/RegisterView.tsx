import React from 'react';
import { routes } from '@src/app/Router';
import RegisterForm from './RegisterFormView';
import { LoginLink, RegisterFooter, RegisterWrapper } from '../styles/register.styled';

function RegisterView() {
  return (
    <RegisterWrapper>
      <RegisterForm />

      <RegisterFooter>
        <LoginLink to={routes.login}>Go to Login</LoginLink>
      </RegisterFooter>
    </RegisterWrapper>
  );
}

export default RegisterView;
