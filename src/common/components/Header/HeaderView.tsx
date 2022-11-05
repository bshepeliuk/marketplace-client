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
import { Header, LoginLink, SearchWrap, Container } from './header.styled';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import LogoButton from './atoms/LogoButton';

function HeaderView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const { isSeller, isBuyer } = useCheckUserRole();

  const isUnauthorized = !isLoggedIn;

  return (
    <Header>
      <Container>
        <LogoButton>Marketplace</LogoButton>

        <CategoriesDropDown />

        <SearchWrap>
          <SearchBarView hasSuggestions />
        </SearchWrap>

        {isBuyer && <CartLink />}
        {isSeller && <AddDeviceLink />}
        {isBuyer && <ComparisonLink />}

        <UserInfoView />

        {isUnauthorized && <LoginLink to={routes.login}>Login</LoginLink>}

        <BurgerMenu />
      </Container>
    </Header>
  );
}

export default HeaderView;
