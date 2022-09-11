import { routes } from '@src/app/Router';
import StarRating from '@src/common/components/StarRating/StarRatingView';
import useCartBtnClick from '@src/features/cart/hooks/useCartBtnClick';
import React from 'react';
import { generatePath, useLocation } from 'react-router-dom';
import AddToCartButton from '../../atoms/AddToCartButton';
import ComparisonButton from '../../atoms/ComparisonButton';
import ImageView from '../../atoms/ImageView';
import calculateAvgRating from '../../helpers/calculateAvgRating';
import {
  CartBtnWrapper,
  DeviceTitleLink,
  ListItem,
  Price,
  RatingTitle,
  RatingWrapper,
} from '../../styles/deviceItem.styled';
import { IDevice, IDeviceRating } from '../../types';

interface IProps {
  device: IDevice;
}

function DevicesByCategoryListItem({ device }: IProps) {
  const location = useLocation();
  const { handle, hasAddedToCart } = useCartBtnClick();

  const ratings = device?.ratings ? device.ratings : [];
  const avgRating = calculateAvgRating(ratings as IDeviceRating[]);

  const inCart = hasAddedToCart(device);

  return (
    <ListItem>
      <ImageView device={device} />

      <DeviceTitleLink
        to={generatePath(routes.device, { deviceId: `${device.id}` })}
        state={{
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

export default DevicesByCategoryListItem;
