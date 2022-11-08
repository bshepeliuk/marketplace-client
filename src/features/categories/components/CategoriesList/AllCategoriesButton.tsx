import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { routes } from '@src/app/Router';
import useFetchDevicesByRequest from '@src/features/devices/hooks/useFetchDevicesByRequest';
import { CategoryButton } from '../../styles/categoriesList.styled';

function AllCategoriesButton() {
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const fetchDevices = useFetchDevicesByRequest();
  // prettier-ignore
  const isActive = location.pathname === routes.home && location.search === "";
  const className = isActive ? 'active-category' : '';

  const onCategoryClick = () => {
    setSearchParams([]);
    fetchDevices({ filters: [] });
  };

  return (
    <CategoryButton className={className} onClick={onCategoryClick}>
      All
    </CategoryButton>
  );
}

export default AllCategoriesButton;
