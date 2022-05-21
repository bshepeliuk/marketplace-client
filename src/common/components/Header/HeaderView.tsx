import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import UserInfoView from '../UserInfo/UserInfoView';

function HeaderView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <LogoLink to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </LogoLink>

      <CategoriesDropDown />
      <UserInfoView />
      {!isLoggedIn && <LoginLink to={routes.login}>Login</LoginLink>}
    </Header>
  );
}

const Header = styled.header`
  height: 80px;
  align-items: center;
  padding: 10px 20px;
  display: flex;
  background-color: #303030;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: 200px 200px 1fr 200px;
  justify-items: center;
`;

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.2s ease-out;

  &:hover {
    transform: scale(1.01);
    letter-spacing: 2px;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  grid-column-start: 4;
  text-transform: uppercase;
  font-size: 14px;
`;

export default HeaderView;
