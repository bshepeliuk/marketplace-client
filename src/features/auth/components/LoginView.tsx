import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';
import LoginFormView from './LoginFormView';
import { LoginWrapper } from '../styles/login.styled';

function LoginView() {
  return (
    <LoginWrapper>
      <LoginFormView />
      <Link to={routes.register}>go to registration</Link>
    </LoginWrapper>
  );
}

export default LoginView;
