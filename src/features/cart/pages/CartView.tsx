import React, { useEffect, useReducer } from 'react';
import { FixedSizeList as List } from 'react-window';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useLocation } from 'react-router-dom';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import { Container, PayButton } from '../styles/cartList.styled';
import EmptyCartView from '../components/EmptyCartView';
import CartItemView from '../components/CartItemView';
import cartCalcReducer, {
  cartCalcActions,
  cartCalcInitState,
} from '../modules/cartCalcModule';

interface ILocationStateProps {
  rowIndex?: number;
}

function CartView() {
  const [localState, dispatch] = useReducer(cartCalcReducer, cartCalcInitState);
  const { items } = useTypedSelector((state) => state.cart);
  const location = useLocation();
  const { pay, isPending } = useMakePayment(localState.devices);

  const locationState = location.state as ILocationStateProps;

  const ROW_INDEX = locationState?.rowIndex ?? 0;
  const ROW_HEIGHT = 100;

  const hasNoDevicesInCart = items.length === 0;

  useEffect(() => {
    dispatch(cartCalcActions.addDefaultCounter(items));
    dispatch(cartCalcActions.sum());
  }, [items]);

  const updateCount = (id: number, count: number) => {
    dispatch(cartCalcActions.updateCounter({ id, count }));
  };

  if (hasNoDevicesInCart) return <EmptyCartView />;

  return (
    <>
      <HeaderView />

      <Container>
        <List
          className="custom-scrollbar"
          itemCount={items.length}
          itemData={{ items, updateCount }}
          width={650}
          height={700}
          itemSize={ROW_HEIGHT}
          overscanCount={5}
          initialScrollOffset={ROW_HEIGHT * ROW_INDEX}
        >
          {CartItemView}
        </List>

        <div>
          <p>Total: {localState.sum}</p>
          <PayButton type="button" onClick={pay} disabled={isPending}>
            {isPending ? 'Processing...' : 'Pay for it'}
          </PayButton>
        </div>
      </Container>
    </>
  );
}

export default CartView;
