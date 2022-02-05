import { routes } from '@src/app/Router';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { COLUMN_COUNT, GUTTER_SIZE } from '../constants';
import {
  Image,
  ImagePlaceholder,
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

  const hasImages = device?.images?.length > 0;

  const styles = {
    ...style,
    left: Number(style!.left) + GUTTER_SIZE,
    top: Number(style!.top) + GUTTER_SIZE,
    width: Number(style!.width) - GUTTER_SIZE,
    height: Number(style!.height) - GUTTER_SIZE,
  };
  // TODO: refactoring
  return itemIndex >= data.length && device === undefined ? (
    <ListItem style={styles}>Loading...</ListItem>
  ) : (
    <ListItem key={device.id} style={styles}>
      <ImageWrapper>
        {hasImages ? (
          <Image src={device.images[0].url} alt={device.name} />
        ) : (
          <ImagePlaceholderView />
        )}
      </ImageWrapper>

      <Link to={generatePath(routes.device, { deviceId: `${device.id}` })}>
        <Title>{device.name}</Title>
      </Link>

      <div>$ {device.price}</div>
    </ListItem>
  );
}

function ImagePlaceholderView() {
  return <ImagePlaceholder>No Images yet.</ImagePlaceholder>;
}

export default DeviceItemView;
