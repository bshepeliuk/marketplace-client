import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '@features/auth/hooks/useLogout';
import styled from 'styled-components';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { routes } from '@src/app/Router';

const Header = styled.header`
  height: 80px;
  align-self: center;
  padding: 10px 20px;
`;

function HeaderView() {
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <Link to={routes.home}>Marketplace</Link>
      <h1>{user?.fullName}</h1>
      {isLoggedIn && (
        <button type="button" onClick={onLogout}>
          logout
        </button>
      )}
    </Header>
  );
}

export default HeaderView;
