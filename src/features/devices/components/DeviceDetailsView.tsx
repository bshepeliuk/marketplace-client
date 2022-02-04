import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
import { useParams } from 'react-router-dom';
import useGetDeviceById from '../hooks/useGetDeviceById';

function DeviceDetailsView() {
  const { deviceId } = useParams();
  const { device } = useGetDeviceById(deviceId);

  return (
    <>
      <HeaderView />
      <Container>
        <h1>{device?.name}</h1>

        {device && device?.images.length > 0 && (
          <img src={device?.images[0].url} alt={device?.name} />
        )}
        <div>price: {device?.price}</div>
      </Container>
    </>
  );
}

export default DeviceDetailsView;
