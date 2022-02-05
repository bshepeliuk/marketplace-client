import React from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
import { Container } from '@src/common/styles/base.styled';

function LoadingDeviceView() {
  return (
    <>
      <HeaderView />
      <Container>
        <div>Loading...</div>
      </Container>
    </>
  );
}

export default LoadingDeviceView;
