import React from 'react';
import { useSearchParams } from 'react-router-dom';

import useFetchDevicesByRequest from '@src/features/devices/hooks/useFetchDevicesByRequest';
import { CategoryButton, ListItem } from '../../styles/categoriesList.styled';
import { ICategory } from '../../types';

interface IProps {
  category: ICategory;
  active: string | undefined;
}

function CategoryItemView(props: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchDevices = useFetchDevicesByRequest();

  const { category, active } = props;

  const isActive = active === category.name;
  const className = isActive ? 'active-category' : '';

  const onCategoryClick = () => {
    searchParams.set('categoryId', String(category.id));
    setSearchParams(searchParams);

    fetchDevices({ filters: Array.from(searchParams.entries()) });
  };

  return (
    <ListItem key={category.id}>
      <CategoryButton className={className} onClick={onCategoryClick}>
        {category.name}
      </CategoryButton>
    </ListItem>
  );
}

export default CategoryItemView;
