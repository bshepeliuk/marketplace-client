import React from 'react';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CartIconView from '@src/common/atoms/CartIcon/CartIconView';
import { routes } from '@src/app/Router';
import { ROLES } from '@src/common/constants';
import AddDeviceIcon from '@common/atoms/AddDeviceIcon/AddDeviceIcon';
import UserInfoView from '../UserInfo/UserInfoView';
import { Header, LoginLink, LogoLink } from './header.styled';

function HeaderView() {
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  const isSellerRole = user?.role === ROLES.SELLER;

  return (
    <Header>
      <LogoLink to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </LogoLink>

      <CategoriesDropDown />

      {!isSellerRole && <CartIconView />}
      {isSellerRole && <AddDeviceIcon />}

      <UserInfoView />

      {!isLoggedIn && <LoginLink to={routes.login}>Login</LoginLink>}
    </Header>
  );
}

export default HeaderView;
