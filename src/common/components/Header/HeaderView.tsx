import React from 'react';
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import CartLink from '@common/atoms/CartLink/CartLink';
import AddDeviceLink from '@common/atoms/AddDeviceLink/AddDeviceLink';
import SearchBarView from '@features/search/components/SearchBar/SearchBar';
import ComparisonLink from '@common/atoms/ComparisonLink/ComparisonLink';
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

      {isBuyer && <CartLink />}
      {isSeller && <AddDeviceLink />}

      {isBuyer && <ComparisonLink />}

      <UserInfoView />

      {!isLoggedIn && <LoginLink to={routes.login}>Login</LoginLink>}

      <BurgerMenu />
    </Header>
  );
}

export default HeaderView;
