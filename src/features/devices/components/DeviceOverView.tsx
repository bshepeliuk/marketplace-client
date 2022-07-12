import React from 'react';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import { IDevice, IDeviceImage, IDeviceInfo, IDeviceWithCount } from '../types';
import {
  FeatureDescription,
  FeatureTitle,
  Image,
  ImageWrapper,
  InfoItem,
  InfoList,
  InfoWrap,
  Price,
  PurchaseButton,
  PurchaseWrap,
} from '../styles/deviceDetails.styled';

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

  return (
    <>
      {hasDeviceImages && (
        <ImageWrapper>
          <Image src={images[0].url} alt={device.name} />
        </ImageWrapper>
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

function DeviceFeatureList({ features }: { features: IDeviceInfo[] }) {
  return (
    <InfoList>
      {features.map((item) => {
        return (
          <InfoItem key={item.id}>
            <FeatureTitle>{item.title}:</FeatureTitle>
            <FeatureDescription>{item.description}</FeatureDescription>
          </InfoItem>
        );
      })}
    </InfoList>
  );
}

export default DeviceOverView;
