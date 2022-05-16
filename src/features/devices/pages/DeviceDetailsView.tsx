import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
// eslint-disable-next-line max-len
import useSlowDownLoaderIndicator from '@common/hooks/useSlowDownLoaderIndicator';
import useGetDeviceById from '../hooks/useGetDeviceById';
import {
  Image,
  ImageWrapper,
  InnerWrap,
  PurchaseButton,
} from '../styles/deviceDetails.styled';
import LoadingDeviceDetailsView from '../components/LoadingDeviceDetailsView';
import NotFoundDeviceView from '../components/NotFoundDeviceView';
import useGoTo from '../hooks/useGoTo';

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
          <h1>{device.name}</h1>

          {hasDeviceImages && (
            <ImageWrapper>
              <Image src={device.images[0].url} alt={device.name} />
            </ImageWrapper>
          )}

          <div>
            <PurchaseButton type="button">purchase</PurchaseButton>
            <p>price: {device.price}</p>
          </div>

          <button type="button" onClick={goBack}>
            go back
          </button>
        </InnerWrap>
      </Container>
    </>
  );
}

export default DeviceDetailsView;
