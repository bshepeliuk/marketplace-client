import React from 'react';
import { routes } from '@src/app/Router';
import { Header, LogoLink } from '../styles/auth.styled';

function AuthHeaderView() {
  return (
    <Header>
      <LogoLink to={routes.home}>Marketplace</LogoLink>
    </Header>
  );
}

export default AuthHeaderView;
