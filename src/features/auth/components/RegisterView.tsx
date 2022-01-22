import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';
import RegisterForm from './RegisterFormView';

function RegisterView() {
  return (
    <>
      <RegisterForm />
      <Link to={routes.login}>go to login</Link>
    </>
  );
}

export default RegisterView;
