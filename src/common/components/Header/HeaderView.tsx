import React, { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import CategoriesDropDown from '@features/categories/atoms/CategoriesDropDown/CategoriesDropDown';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import UserInfoView from '../UserInfo/UserInfoView';
import {
  CartCounter,
  CartIcon,
  Header,
  LoginLink,
  LogoLink,
  Text,
  Wrap,
} from './header.styled';

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

function CartIconView() {
  const [hasIncremented, setHasIncremented] = useState(true);
  const { items } = useTypedSelector((state) => state.cart);

  const hasItems = items.length > 0;

  useEffect(() => {
    setHasIncremented(true);

    const timeoutId = setTimeout(() => {
      setHasIncremented(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [items]);

  return (
    <Wrap>
      <Link to={routes.cart}>
        <CartIcon />

        {hasItems && (
          <CartCounter>
            <Text hasIncremented={hasIncremented}>{items.length}</Text>
          </CartCounter>
        )}
      </Link>
    </Wrap>
  );
}

export default HeaderView;
