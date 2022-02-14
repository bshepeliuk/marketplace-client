import React from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
import { Container } from '@src/common/styles/base.styled';

function NotFoundDeviceView() {
  return (
    <>
      <HeaderView />
      <Container>
        <div>This device was not found.</div>
      </Container>
    </>
  );
}

export default NotFoundDeviceView;
