import React, { useRef } from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import DeviceListView from '../devices/components/DeviceListView';
import { DeviceListContainer } from './home.styled';
import CategoriesListView from '../categories/components/CategoriesListView';

function HomeView() {
  const containerRef = useRef(null);

  return (
    <>
      <HeaderView />

      <DeviceListContainer ref={containerRef}>
        <CategoriesListView />
        <DeviceListView containerRef={containerRef} />
      </DeviceListContainer>
    </>
  );
}

export default HomeView;
