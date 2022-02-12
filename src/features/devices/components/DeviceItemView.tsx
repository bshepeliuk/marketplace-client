import { routes } from '@src/app/Router';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { GUTTER_SIZE } from '../constants';
import {
  Image,
  ImagePlaceholder,
  ImageWrapper,
  ListItem,
  Title,
} from '../styles/deviceItem.styled';
import { IDevice, IListItemProps } from '../types';
import DeviceLoaderView from './DeviceLoaderView';

function DeviceItemView(props: IListItemProps) {
  const { style, data, rowIndex, columnIndex } = props;

  const itemIndex = rowIndex * data.COLUMN_COUNT + columnIndex;

  const device = data.items[itemIndex];

  const hasNoDevice = device === undefined;

  const styles = {
    ...style,
    left: Number(style.left) + GUTTER_SIZE,
    top: Number(style.top) + GUTTER_SIZE,
    width: Number(style.width) - GUTTER_SIZE,
    height: Number(style.height) - GUTTER_SIZE,
  };

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

      <Link
        to={generatePath(routes.device, { deviceId: `${device.id}` })}
        state={{ rowIndex }}
      >
        <Title>{device.name}</Title>
      </Link>

      <div>$ {device.price}</div>
    </ListItem>
  );
}

function ImageView({ device }: { device: IDevice }) {
  const hasImages = device?.images?.length > 0;

  return (
    <ImageWrapper>
      {hasImages ? (
        <Image src={device.images[0].url} alt={device.name} />
      ) : (
        <ImagePlaceholderView />
      )}
    </ImageWrapper>
  );
}

function ImagePlaceholderView() {
  return <ImagePlaceholder>No Images yet.</ImagePlaceholder>;
}

export default DeviceItemView;
