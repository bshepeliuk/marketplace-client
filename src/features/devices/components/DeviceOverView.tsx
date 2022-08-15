import React from 'react';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import { IDevice, IDeviceImage, IDeviceInfo, IDeviceWithCount } from '../types';
import {
  InfoWrap,
  Price,
  PurchaseButton,
  PurchaseWrap,
} from '../styles/deviceDetails.styled';
import DeviceFeatureList from './DeviceFeatureList';
import DeviceImageSlider from './DeviceImageSlider';

interface IProps {
  device: IDevice;
}

function DeviceOverView({ device }: IProps) {
  const { pay, isPending } = useMakePayment([
    { ...device, count: 1 },
  ] as IDeviceWithCount[]);

  const hasDeviceImages = device && device.images.length > 0;
  const images = device.images as IDeviceImage[];
  const features = device.info as IDeviceInfo[];

  const urls = images.map((img) => img.url);
  // TODO: delete it later;
  const urlsForTest = [
    'https://content1.rozetka.com.ua/goods/images/big/247653913.jpg',
    'https://i.eldorado.ua//goods_images/1039096/7622609-1641906851.jpg',
    // eslint-disable-next-line max-len
    'https://i.allo.ua/media/catalog/product/cache/3/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/0/3/033d63cb-3e1a-4aba-a4a5-95a02a603875_result_1.jpg',
    // eslint-disable-next-line max-len
    'https://i.allo.ua/media/catalog/product/cache/3/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/u/0/u0617974_big_result_1.jpg',
  ];

  return (
    <>
      {hasDeviceImages && (
        <DeviceImageSlider urls={[...urls, ...urlsForTest]} alt={device.name} />
      )}

      <PurchaseWrap>
        <PurchaseButton type="button" onClick={pay} disabled={isPending}>
          purchase
        </PurchaseButton>

        <Price title={`${device.price} $`}>{device.price} $</Price>
      </PurchaseWrap>

      <InfoWrap>
        <DeviceFeatureList features={features} />
      </InfoWrap>
    </>
  );
}

export default DeviceOverView;
