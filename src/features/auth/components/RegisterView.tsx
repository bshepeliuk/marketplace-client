import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';
import RegisterForm from './RegisterFormView';
import { RegisterWrapper } from '../styles/register.styled';

function RegisterView() {
  return (
    <RegisterWrapper>
      <RegisterForm />
      <Link to={routes.login}>go to login</Link>
    </RegisterWrapper>
  );
}

export default RegisterView;
