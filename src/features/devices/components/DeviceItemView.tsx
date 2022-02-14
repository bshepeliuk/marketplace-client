import React from 'react';
import { generatePath } from 'react-router-dom';
import { routes } from '@src/app/Router';
import ImageView from '../atoms/ImageView';
import { GUTTER_SIZE } from '../constants';
import {
  CartBtnWrapper,
  DeviceTitleLink,
  ListItem,
  Price,
} from '../styles/deviceItem.styled';
import { IListItemProps } from '../types';
import DeviceLoaderView from './DeviceLoaderView';
import AddToCartButton from '../atoms/AddToCartButton';

function DeviceItemView(props: IListItemProps) {
  const { style, data, rowIndex, columnIndex } = props;

  const styles = {
    ...style,
    left: Number(style.left) + GUTTER_SIZE,
    top: Number(style.top) + GUTTER_SIZE,
    width: Number(style.width) - GUTTER_SIZE,
    height: Number(style.height) - GUTTER_SIZE,
  };

  const itemIndex = rowIndex * data.COLUMN_COUNT + columnIndex;

  const device = data.items[itemIndex];

  const hasNoDevice = device === undefined;

  if (data.isLoading || (data.isLoadingMore && hasNoDevice)) {
    return (
      <ListItem style={styles}>
        <DeviceLoaderView />
      </ListItem>
    );
  }

  if (hasNoDevice) return null;

  return (
    <ListItem key={device.id} style={styles}>
      <ImageView device={device} />

      <DeviceTitleLink
        to={generatePath(routes.device, { deviceId: `${device.id}` })}
        state={{ rowIndex }}
      >
        {device.name}
      </DeviceTitleLink>

      <Price>{device.price} $</Price>

      <CartBtnWrapper>
        <AddToCartButton />
      </CartBtnWrapper>
    </ListItem>
  );
}

export default DeviceItemView;
