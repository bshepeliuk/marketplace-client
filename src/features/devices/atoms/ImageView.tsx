import React from 'react';
import { Image } from '../styles/deviceDetails.styled';
import { ImageWrapper } from '../styles/deviceItem.styled';
import { IDevice, IDeviceImage } from '../types';
import ImagePlaceholderView from './ImagePlaceholderView';

function ImageView({ device }: { device: IDevice }) {
  const hasNoImages = device?.images?.length === 0;

  const images = device.images as IDeviceImage[];

  if (hasNoImages) {
    return (
      <ImageWrapper>
        <ImagePlaceholderView />
      </ImageWrapper>
    );
  }

  const preview = images.find((item) => item.preview === true);
  const url = preview !== undefined ? preview.url : images[0].url;

  return (
    <ImageWrapper>
      <Image src={url} alt={device.name} loading="lazy" />
    </ImageWrapper>
  );
}

export default ImageView;
