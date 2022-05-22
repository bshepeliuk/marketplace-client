import React, { useEffect, useReducer } from 'react';
import { FixedSizeList as List } from 'react-window';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@src/app/Router';
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
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

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

  const pay = () => {
    if (!isLoggedIn) {
      navigate(routes.login, { state: { from: location.pathname } });
    } else {
      // TODO: Api.Cart.pay();
    }
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
          <PayButton type="button" onClick={pay}>
            pay
          </PayButton>
        </div>
      </Container>
    </>
  );
}

export default CartView;
