import { useRef } from 'react';
import { DeviceListContainer } from './home.styled';

import CategoriesListView from '../categories/components/CategoriesList/CategoriesListView';
import HomeDeviceList from './components/HomeDeviceList';

function HomeView() {
  const containerRef = useRef(null);

  return (
    <DeviceListContainer ref={containerRef}>
      <CategoriesListView />
      <HomeDeviceList containerRef={containerRef} />
    </DeviceListContainer>
  );
}

export default HomeView;
