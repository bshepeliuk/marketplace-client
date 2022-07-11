import React from 'react';
import { useParams, Route, Routes, Link, generatePath } from 'react-router-dom';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
// eslint-disable-next-line max-len
import useSlowDownLoaderIndicator from '@common/hooks/useSlowDownLoaderIndicator';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import { routes } from '@src/app/Router';
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
  TabsWrap,
  Title,
  TabsContent,
} from '../styles/deviceDetails.styled';
import LoadingDeviceDetailsView from '../components/LoadingDeviceDetailsView';
import NotFoundDeviceView from '../components/NotFoundDeviceView';
import useGoTo from '../hooks/useGoTo';
import { IDevice, IDeviceImage, IDeviceInfo, IDeviceWithCount } from '../types';

function DeviceDetailsView() {
  const { deviceId } = useParams();
  const { goBack } = useGoTo();
  const { device, isLoading, hasNoDevice, hasNoFound } = useGetDeviceById(
    Number(deviceId),
  );

  const isLoadingSlow = useSlowDownLoaderIndicator({
    isLoading,
    duration: 1000,
  });

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

          <DeviceTabs deviceId={device.id} />

          <Routes>
            <Route path="/" element={<DeviceOverView device={device} />} />
            <Route path="/comments" element={<TabInfo />} />
            <Route path="*" element={<div>Not Found....</div>} />
          </Routes>
        </InnerWrap>
      </Container>
    </>
  );
}

function TabInfo() {
  return <TabsContent>rating and comments will be here.</TabsContent>;
}

function DeviceTabs({ deviceId }: { deviceId: number }) {
  return (
    <TabsWrap>
      <Link
        className="tab-link"
        to={generatePath(routes.device, { deviceId: String(deviceId) })}
      >
        Overview
      </Link>
      <Link
        className="tab-link"
        to={generatePath(routes.deviceWithEntity, {
          deviceId: String(deviceId),
          entity: 'comments',
        })}
      >
        Rating & Comments
      </Link>
    </TabsWrap>
  );
}

function DeviceOverView({ device }: { device: IDevice }) {
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
        <InfoList>
          <DeviceFeatureList features={features} />
        </InfoList>
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

export default DeviceDetailsView;
