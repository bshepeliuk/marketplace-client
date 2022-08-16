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
import { DevicePlaceholder } from '../styles/deviceSlider.styled';

interface IProps {
  device: IDevice;
}

function DeviceOverView({ device }: IProps) {
  const { pay, isPending } = useMakePayment([
    { ...device, count: 1 },
  ] as IDeviceWithCount[]);

  const hasDeviceImages = device && device.images.length > 0;
  const hasNoDeviceImages = !hasDeviceImages;
  const images = device.images as IDeviceImage[];
  const features = device.info as IDeviceInfo[];

  const urls = images.map((img) => img.url);

  return (
    <>
      {hasDeviceImages && <DeviceImageSlider urls={urls} alt={device.name} />}

      {hasNoDeviceImages && (
        <DevicePlaceholder>No images yet.</DevicePlaceholder>
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
