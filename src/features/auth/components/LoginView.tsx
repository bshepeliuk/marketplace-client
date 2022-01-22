import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';
import LoginFormView from './LoginFormView';

function LoginView() {
  return (
    <>
      <LoginFormView />
      <Link to={routes.register}>go to registration</Link>
    </>
  );
}

export default LoginView;
