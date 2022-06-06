import React from 'react';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CartIconView from '@src/common/atoms/CartIcon/CartIconView';
import { routes } from '@src/app/Router';
import UserInfoView from '../UserInfo/UserInfoView';
import { Header, LoginLink, LogoLink } from './header.styled';

function HeaderView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <LogoLink to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </LogoLink>

      <CategoriesDropDown />

      <CartIconView />

      <UserInfoView />
      {!isLoggedIn && <LoginLink to={routes.login}>Login</LoginLink>}
    </Header>
  );
}

export default HeaderView;
