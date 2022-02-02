import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
import DeviceListView from '../devices/components/DeviceListView';

function HomeView() {
  return (
    <>
      <HeaderView />
      <Container>
        <DeviceListView />
      </Container>
    </>
  );
}

export default HomeView;
