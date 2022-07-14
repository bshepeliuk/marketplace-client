import React from 'react';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CartIconView from '@src/common/atoms/CartIcon/CartIconView';
import { routes } from '@src/app/Router';
import { ROLES } from '@src/common/constants';
import AddDeviceIcon from '@common/atoms/AddDeviceIcon/AddDeviceIcon';
import SearchBarView from '@src/features/search/components/SearchBar/SearchBar';
import UserInfoView from '../UserInfo/UserInfoView';
import { Header, LoginLink, LogoLink } from './header.styled';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function HeaderView() {
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  const isSellerRole = user?.role === ROLES.SELLER;

  return (
    <Header>
      <LogoLink to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </LogoLink>

      <CategoriesDropDown />

      <SearchBarView />

      {!isSellerRole && <CartIconView />}
      {isSellerRole && <AddDeviceIcon />}

      <UserInfoView />

      {!isLoggedIn && <LoginLink to={routes.login}>Login</LoginLink>}

      <BurgerMenu />
    </Header>
  );
}

export default HeaderView;
