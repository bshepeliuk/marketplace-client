import React from 'react';
import { Image } from '../styles/deviceDetails.styled';
import { ImageWrapper } from '../styles/deviceItem.styled';
import { IDevice } from '../types';
import ImagePlaceholderView from './ImagePlaceholderView';

function ImageView({ device }: { device: IDevice }) {
  const hasNoImages = device?.images?.length === 0;

  if (hasNoImages) {
    return (
      <ImageWrapper>
        <ImagePlaceholderView />
      </ImageWrapper>
    );
  }

  return (
    <ImageWrapper>
      <Image src={device.images[0].url} alt={device.name} />
    </ImageWrapper>
  );
}

export default ImageView;
