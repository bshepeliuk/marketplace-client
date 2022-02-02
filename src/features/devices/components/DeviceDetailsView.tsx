import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { deviceSelector } from '../selectors/deviceSelector';

function DeviceDetailsView() {
  const { deviceId } = useParams();
  const device = useTypedSelector((state) => deviceSelector(state, deviceId));

  return (
    <>
      <HeaderView />
      <Container>
        <div>Device Info: {deviceId}</div>
        <h1>{device?.name}</h1>
      </Container>
    </>
  );
}

export default DeviceDetailsView;
