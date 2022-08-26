import React from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import { CartIcon, Counter, Text, Wrap } from './cartLink.styled';

function CartLink() {
  return (
    <Wrap>
      <Link to={routes.cart}>
        <CartIcon />
        <CartCounter />
      </Link>
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
