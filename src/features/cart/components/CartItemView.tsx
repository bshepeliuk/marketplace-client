import React, { useEffect, useState } from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import { CSSProperties } from 'styled-components';

import { IDevice, IDeviceImage } from '@src/features/devices/types';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { routes } from '@src/app/Router';
import { cartActions } from '../cartSlice';
import {
  Counter,
  CounterWrap,
  DecrementBtn,
  DeleteIcon,
  DeviceLink,
  Image,
  IncrementBtn,
  Price,
  Title,
} from '../styles/cartItem.styled';

interface IData {
  items: IDevice[];
  // eslint-disable-next-line no-unused-vars
  updateCount: (id: number, count: number) => void;
}

interface IProps {
  index: number;
  style: CSSProperties;
  data: IData;
}

const GUTTER_SIZE = 10;

function CartItemView({ index, style, data }: IProps) {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const location = useLocation();

  const item = data.items[index];
  const price = item.price * count;

  const hasImages = item.images.length > 0;

  useEffect(() => {
    data.updateCount(item.id, count);
  }, [count]);

  const remove = () => {
    dispatch(cartActions.removeFromCart({ device: item }));
  };

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
  };

  const styles = {
    ...style,
    top: Number(style.top) + GUTTER_SIZE,
    height: Number(style.height) - GUTTER_SIZE,
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '10px',
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '100px 220px 150px 100px 40px',
    border: '1px solid rgba(189, 195, 199, 0.2)',
    boxShadow: 'rgba(99, 99, 99, 0.07) 0px 2px 8px 0px',
    width: '99%',
  };

  return (
    <div style={styles}>
      {hasImages && (
        <Image src={(item.images[0] as IDeviceImage).url} alt={item.name} />
      )}

      <DeviceLink
        to={generatePath(routes.device, { deviceId: `${item.id}` })}
        state={{
          rowIndex: index,
          from: {
            pathname: location.pathname,
          },
        }}
      >
        <Title>{item.name}</Title>
      </DeviceLink>

      <CounterWrap>
        <IncrementBtn type="button" onClick={increment}>
          +
        </IncrementBtn>
        <Counter>{count}</Counter>
        <DecrementBtn type="button" onClick={decrement}>
          -
        </DecrementBtn>
      </CounterWrap>
      <Price>{price} $</Price>

      <DeleteIcon onClick={remove} />
    </div>
  );
}

export default CartItemView;
