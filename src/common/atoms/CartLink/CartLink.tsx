import React from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import { CartIcon, Counter, CustomLink, Text, Wrap } from './cartLink.styled';

function CartLink() {
  return (
    <Wrap>
      <CustomLink to={routes.cart}>
        <CartIcon />
        <CartCounter />
      </CustomLink>
    </Wrap>
  );
}

function CartCounter() {
  const { items } = useTypedSelector((state) => state.cart);

  const hasNoItems = items.length === 0;

  if (hasNoItems) return null;

  return (
    <Counter>
      <Text key={items.length}>{items.length}</Text>
    </Counter>
  );
}

export default CartLink;
