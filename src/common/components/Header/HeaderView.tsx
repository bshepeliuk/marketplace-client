import React from 'react';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CartIconView from '@src/common/atoms/CartIcon/CartIconView';
import { routes } from '@src/app/Router';
import AddDeviceIcon from '@common/atoms/AddDeviceIcon/AddDeviceIcon';
import SearchBarView from '@src/features/search/components/SearchBar/SearchBar';
import useCheckUserRole from '@common/hooks/useCheckUserRole';
import UserInfoView from '../UserInfo/UserInfoView';
import { Header, LoginLink, LogoLink, SearchWrap } from './header.styled';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function HeaderView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const { isSeller, isBuyer } = useCheckUserRole();

  return (
    <Header>
      <LogoLink to={routes.home} state={{ shouldRefetchDevices: true }}>
        Marketplace
      </LogoLink>

      <CategoriesDropDown />

      <SearchWrap>
        <SearchBarView hasSuggestions />
      </SearchWrap>

      {isBuyer && <CartIconView />}
      {isSeller && <AddDeviceIcon />}

      <UserInfoView />

      {!isLoggedIn && <LoginLink to={routes.login}>Login</LoginLink>}
      {isLoggedIn && <BurgerMenu />}
    </Header>
  );
}

export default HeaderView;
