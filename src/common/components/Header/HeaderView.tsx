import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '@features/auth/hooks/useLogout';
import styled from 'styled-components';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown';

const Header = styled.header`
  height: 80px;
  align-items: center;
  padding: 10px 20px;
  display: flex;
  background-color: #303030;
  margin-bottom: 80px;
`;

function HeaderView() {
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <Link to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </Link>
      <CategoriesDropDown />
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
