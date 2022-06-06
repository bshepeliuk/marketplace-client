import React from 'react';
import { routes } from '@src/app/Router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function AuthHeaderView() {
  return (
    <Header>
      <LogoLink to={routes.home}>Marketplace</LogoLink>
    </Header>
  );
}

const Header = styled.header`
  grid-column: span 3;
  align-self: center;
  padding: 10px 20px;
  height: 80px;
  grid-template-columns: 200px 1fr;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const LogoLink = styled(Link)`
  color: #1abc9c;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.01);
    letter-spacing: 2px;
  }
`;

export default AuthHeaderView;
