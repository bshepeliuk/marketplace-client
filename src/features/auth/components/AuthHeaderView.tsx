import React from 'react';
import { routes } from '@src/app/Router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function AuthHeaderView() {
  return (
    <Header>
      <Link to={routes.home}>Marketplace</Link>
    </Header>
  );
}

const Header = styled.header`
  grid-column: span 3;
  align-self: center;
  padding: 10px 20px;
`;

export default AuthHeaderView;
