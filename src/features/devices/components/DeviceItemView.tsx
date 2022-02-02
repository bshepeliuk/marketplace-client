import { routes } from '@src/app/Router';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { COLUMN_COUNT, GUTTER_SIZE } from '../constants';
import {
  Image,
  ImageWrapper,
  ListItem,
  Title,
} from '../styles/deviceItem.styled';
import { IListItemProps } from '../types';

function DeviceItemView({
  style,
  data,
  rowIndex,
  columnIndex,
}: IListItemProps) {
  const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;

  const device = data[itemIndex];
  const hasImages = device?.images.length > 0;

  const styles = {
    ...style,
    left: Number(style!.left) + GUTTER_SIZE,
    top: Number(style!.top) + GUTTER_SIZE,
    width: Number(style!.width) - GUTTER_SIZE,
    height: Number(style!.height) - GUTTER_SIZE,
  };

  if (!device) return null;

  return (
    <ListItem key={device.id} style={styles}>
      <ImageWrapper>
        {hasImages && <Image src={device.images[0].url} alt={device.name} />}
      </ImageWrapper>

      <Link
        to={generatePath(routes.device, { deviceId: device.id.toString() })}
      >
        <Title>{device.name}</Title>
      </Link>
      <p>price: {device.price}</p>
    </ListItem>
  );
}

export default DeviceItemView;
