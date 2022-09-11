import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { DeviceListContainer } from './home.styled';

import CategoriesListView from '../categories/components/CategoriesList/CategoriesListView';
import RecentlyViewedDevices from '../recentlyViewed/pages/RecentlyViewed';
import HomeDeviceList from './components/HomeDeviceList';

function HomeView() {
  const containerRef = useRef(null);

  return (
    <DeviceListContainer ref={containerRef}>
      <CategoriesListView />
      <Routes>
        <Route path="/*" element={<HomeDeviceList containerRef={containerRef} />} />
        <Route path={routes.recentlyViewed} element={<RecentlyViewedDevices />} />
        <Route path="*" element={<div>Not Found.</div>} />
      </Routes>
    </DeviceListContainer>
  );
}

export default HomeView;
