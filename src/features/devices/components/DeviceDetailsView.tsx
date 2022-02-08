import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { routes } from '@src/app/Router';
import useGetDeviceById from '../hooks/useGetDeviceById';
import {
  Image,
  ImageWrapper,
  InnerWrap,
  PurchaseButton,
} from '../styles/deviceDetails.styled';
import LoadingDeviceView from './LoadingDeviceView';
import NotFoundDeviceView from './NotFoundDeviceView';

interface ILocationStateProps {
  rowIndex: number;
}

function DeviceDetailsView() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // prettier-ignore
  const {
    device,
    isLoading,
    hasNoDeviceFound,
    hasDeviceImages
  } = useGetDeviceById(deviceId);

  const locationState = location.state as ILocationStateProps;

  const goHome = () => {
    navigate(routes.home, {
      state: { rowIndex: locationState.rowIndex },
    });
  };

  if (isLoading) return <LoadingDeviceView />;
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
          <button type="button" onClick={goHome}>
            go back
          </button>
        </InnerWrap>
      </Container>
    </>
  );
}

export default DeviceDetailsView;
