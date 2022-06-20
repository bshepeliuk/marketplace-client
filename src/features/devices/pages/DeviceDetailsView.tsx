import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
// eslint-disable-next-line max-len
import useSlowDownLoaderIndicator from '@common/hooks/useSlowDownLoaderIndicator';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import useGetDeviceById from '../hooks/useGetDeviceById';
import {
  BackBtn,
  FeatureDescription,
  FeatureTitle,
  Image,
  ImageWrapper,
  InfoItem,
  InfoList,
  InfoWrap,
  InnerWrap,
  Price,
  PurchaseButton,
  PurchaseWrap,
  Title,
} from '../styles/deviceDetails.styled';
import LoadingDeviceDetailsView from '../components/LoadingDeviceDetailsView';
import NotFoundDeviceView from '../components/NotFoundDeviceView';
import useGoTo from '../hooks/useGoTo';
import { IDeviceInfo, IDeviceWithCount } from '../types';

function DeviceDetailsView() {
  const { deviceId } = useParams();
  const { goBack } = useGoTo();
  const { device, isLoading, hasNoDevice, hasNoFound } = useGetDeviceById(
    Number(deviceId),
  );

  const { pay, isPending } = useMakePayment([
    { ...device, count: 1 },
  ] as IDeviceWithCount[]);

  const isLoadingSlow = useSlowDownLoaderIndicator({
    isLoading,
    duration: 1000,
  });

  const hasDeviceImages = device && device.images.length > 0;

  if (isLoadingSlow) return <LoadingDeviceDetailsView />;

  if (hasNoDevice && !isLoadingSlow && hasNoFound) {
    return <NotFoundDeviceView />;
  }

  if (!device) return null;

  return (
    <>
      <HeaderView />

      <Container>
        <InnerWrap>
          <BackBtn id="back-btn" onClick={goBack} />

          <Title>{device.name}</Title>

          {hasDeviceImages && (
            <ImageWrapper>
              <Image src={device.images[0].url} alt={device.name} />
            </ImageWrapper>
          )}

          <PurchaseWrap>
            <PurchaseButton type="button" onClick={pay} disabled={isPending}>
              purchase
            </PurchaseButton>

            <Price title={`${device.price} $`}>{device.price} $</Price>
          </PurchaseWrap>

          <InfoWrap>
            <InfoList>
              <DeviceFeatureList features={device.info} />
            </InfoList>
          </InfoWrap>
        </InnerWrap>
      </Container>
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

export default DeviceDetailsView;
