import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '@features/auth/hooks/useLogout';
import styled from 'styled-components';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { routes } from '@src/app/Router';

const Header = styled.header`
  height: 80px;
  align-items: center;
  padding: 10px 20px;
  display: flex;
  background-color: #303030;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
`;

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.7s ease-out;

  &:hover {
    transform: scale(1.01);
    letter-spacing: 2px;
  }
`;

function HeaderView() {
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <LogoLink to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </LogoLink>

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
