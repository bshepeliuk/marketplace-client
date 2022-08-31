import React from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import { routes } from '@src/app/Router';
import useCartBtnClick from '@src/features/cart/hooks/useCartBtnClick';
import StarRating from '@common/components/StarRating/StarRatingView';
import useAddToComparison from '@features/comparison/hooks/useAddToComparison';
import useCheckComparison from '@features/comparison/hooks/useCheckComparison';
import useDeleteFromComparison from '@features/comparison/hooks/useDeleteFromComparison';
import ImageView from '../atoms/ImageView';
import { GUTTER_SIZE } from '../constants';
import {
  BalanceScaleIcon,
  CartBtnWrapper,
  DeviceTitleLink,
  ListItem,
  Price,
  RatingTitle,
  RatingWrapper,
} from '../styles/deviceItem.styled';
import { IDevice, IDeviceRating, IListItemProps } from '../types';
import DeviceLoaderView from './DeviceLoaderView';
import AddToCartButton from '../atoms/AddToCartButton';
import calculateAvgRating from '../helpers/calculateAvgRating';

function DeviceItemView(props: IListItemProps) {
  const location = useLocation();
  const { handle, hasAddedToCart } = useCartBtnClick();

  const { style, data, rowIndex, columnIndex } = props;

  const itemIndex = rowIndex * data.COLUMN_COUNT + columnIndex;
  const device = data.items[itemIndex];

  const hasNoDevice = device === undefined;

  const ratings = device?.ratings ? device.ratings : [];
  const avgRating = calculateAvgRating(ratings as IDeviceRating[]);

  const inCart = hasAddedToCart(device);

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

      <DeviceTitleLink
        to={generatePath(routes.device, { deviceId: `${device.id}` })}
        state={{
          rowIndex,
          from: {
            pathname: location.pathname,
            search: location.search,
          },
        }}
      >
        {device.name}
      </DeviceTitleLink>

      <Price>{device.price} $</Price>

      <ComparisonButton device={device} />

      <RatingWrapper>
        <StarRating totalStars={5} size={16} precision={0.5} initRating={avgRating} isInteractive={false} />
        <RatingTitle>{avgRating}</RatingTitle>
      </RatingWrapper>

      <CartBtnWrapper>
        <AddToCartButton inCart={inCart} onClick={() => handle(device)} />
      </CartBtnWrapper>
    </ListItem>
  );
}

function ComparisonButton({ device }: { device: IDevice }) {
  const { addToComparison } = useAddToComparison();
  const { deleteById } = useDeleteFromComparison();
  const { isUnique } = useCheckComparison();

  const isUniqueDevice = isUnique(device);

  const handleComparison = () => {
    if (isUniqueDevice) {
      addToComparison(device);
    } else {
      deleteById(device.id);
    }
  };

  return <BalanceScaleIcon isUnique={isUniqueDevice} onClick={handleComparison} />;
}

export default DeviceItemView;
