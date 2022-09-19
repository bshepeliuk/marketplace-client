import React from 'react';
import { routes } from '@src/app/Router';
import LoginFormView from './LoginFormView';
import { LoginFooter, LoginWrapper, RegisterLink } from '../styles/login.styled';

function LoginView() {
  return (
    <LoginWrapper>
      <LoginFormView />

      <LoginFooter>
        No registered yet? <RegisterLink to={routes.register}>Create an account.</RegisterLink>
      </LoginFooter>
    </LoginWrapper>
  );
}

export default LoginView;
