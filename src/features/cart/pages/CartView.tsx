import React, { useEffect, useReducer, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import useContainerDimensions from '@common/hooks/useContainerDimensions';
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

const PayWrapper = styled.div`
  grid-column-start: 2;

  @media (max-width: 1000px) {
    grid-column-start: 1;
    order: 1;
    justify-self: end;
    margin-bottom: 20px;
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    column-gap: 30px;
  }

  @media (max-width: 700px) {
    justify-self: center;
    display: flex;
  }
`;

const ListWrap = styled.div`
  grid-column-start: 1;
  justify-self: center;

  @media (max-width: 1000px) {
    grid-column-start: 1;
    order: 2;
  }
`;

const TotalPrice = styled.p`
  justify-self: end;

  @media (max-width: 1000px) {
    justify-self: end;
    font-size: 20px;
    margin: 0;
    align-self: center;
  }
`;

const getListWidthByContainerWidth = (width: number) => {
  // TODO: refactoring;
  if (width <= 420) return 360;
  if (width <= 600) return 400;
  if (width <= 700) return 520;
  return 650;
};

function CartView() {
  // TODO: hook for LIST_WIDTH;
  const containerRef = useRef(null);
  const { size } = useContainerDimensions(containerRef);
  const LIST_WIDTH = getListWidthByContainerWidth(size.width);

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

      <Container ref={containerRef}>
        <ListWrap>
          <List
            className="custom-scrollbar"
            itemCount={items.length}
            itemData={{ items, updateCount }}
            width={LIST_WIDTH}
            height={700}
            itemSize={ROW_HEIGHT}
            overscanCount={5}
            initialScrollOffset={ROW_HEIGHT * ROW_INDEX}
          >
            {CartItemView}
          </List>
        </ListWrap>

        <PayWrapper>
          <TotalPrice>Total: {localState.sum}</TotalPrice>
          <PayButton type="button" onClick={pay} disabled={isPending}>
            {isPending ? 'Processing...' : 'Pay for it'}
          </PayButton>
        </PayWrapper>
      </Container>
    </>
  );
}

export default CartView;
