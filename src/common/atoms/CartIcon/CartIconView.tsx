import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { routes } from '@src/app/Router';
import { CartCounter, CartIcon, Text, Wrap } from './cartIcon.styled';

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

export default CartIconView;
