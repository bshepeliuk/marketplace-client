import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import DeviceListView from '../devices/pages/DeviceListView';
import { DeviceListContainer } from './home.styled';

function HomeView() {
  return (
    <>
      <HeaderView />
      <DeviceListContainer>
        <DeviceListView />
      </DeviceListContainer>
    </>
  );
}

export default HomeView;
