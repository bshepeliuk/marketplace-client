import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line max-len
import useGetDevicesByCategory from '@features/devices/hooks/useGetDevicesByCategory';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetCategories from '../hooks/useGetCategories';
import {
  CategoryButton,
  List,
  Wrap,
  ListItem,
} from '../styles/categoriesList.styled';
import { ICategory } from '../types';
import useGetCategoryId from '../hooks/useGetCategoryId';

const useGetDevicesByRequest = () => {
  const categoryId = useGetCategoryId();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const getAll = () => {
    if (categoryId === undefined) return;

    dispatch(getDevices({ offset: 0, limit: 20 }));

    navigate({
      pathname: '/',
      search: undefined,
    });
  };

  return {
    getAll,
  };
};

function GetAllDevicesButton() {
  const { getAll } = useGetDevicesByRequest();

  return (
    <CategoryButton type="button" onClick={getAll}>
      All
    </CategoryButton>
  );
}

function CategoriesListView() {
  const categoryId = useGetCategoryId();
  const { items } = useGetCategories();

  return (
    <Wrap>
      <List>
        <ListItem>
          <GetAllDevicesButton />
        </ListItem>
        {items.map((item) => (
          <CategoryItemView
            key={item.id}
            category={item}
            currentCategoryId={categoryId}
          />
        ))}
      </List>
    </Wrap>
  );
}

function CategoryItemView({
  category,
  currentCategoryId,
}: {
  category: ICategory;
  currentCategoryId: number | undefined;
}) {
  const navigate = useNavigate();
  const { getByCategory } = useGetDevicesByCategory();

  const handleClick = () => {
    if (currentCategoryId === category.id) return;

    getByCategory(category.id);

    navigate({ pathname: '/', search: `?categoryId=${category.id}` });
  };

  return (
    <ListItem key={category.id}>
      <CategoryButton type="button" onClick={handleClick}>
        {category.name}
      </CategoryButton>
    </ListItem>
  );
}

export default CategoriesListView;
