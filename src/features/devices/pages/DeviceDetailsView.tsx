import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
import { useParams } from 'react-router-dom';
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
  // prettier-ignore
  // eslint-disable-next-line max-len
  const { device, isLoading, hasNoDeviceFound, hasDeviceImages } = useGetDeviceById(deviceId);

  if (isLoading) return <LoadingDeviceDetailsView />;
  if (hasNoDeviceFound) return <NotFoundDeviceView />;

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
