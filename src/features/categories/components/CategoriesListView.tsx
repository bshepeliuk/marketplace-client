import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line max-len
import useGetDevicesByCategory from '@features/devices/hooks/useGetDevicesByCategory';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetCategories from '../hooks/useGetCategories';
import { List, Wrap } from '../styles/categoriesList.styled';
import { ICategory } from '../types';

const useGetDevicesByRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getAll = () => {
    if (location.state === null) return;

    dispatch(getDevices({ offset: 0, limit: 20 }));

    navigate(location.pathname, { replace: true, state: null });
  };

  return {
    getAll,
  };
};

function CategoriesListView() {
  const { items } = useGetCategories();
  const { getAll } = useGetDevicesByRequest();

  return (
    <Wrap>
      <List>
        <li>
          <button type="button" onClick={getAll}>
            All
          </button>
        </li>
        {items.map((item) => (
          <CategoryItemView key={item.id} category={item} />
        ))}
      </List>
    </Wrap>
  );
}

interface ILocationState {
  categoryId: number;
}

function CategoryItemView({ category }: { category: ICategory }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { getByCategory } = useGetDevicesByCategory();

  const locationState = location.state as ILocationState;

  const handleClick = () => {
    if (locationState?.categoryId === category.id) return;

    getByCategory(category.id);

    navigate('/', {
      state: { categoryId: category.id },
    });
  };

  return (
    <li key={category.id}>
      <button type="button" onClick={handleClick}>
        {category.name}
      </button>
    </li>
  );
}

export default CategoriesListView;
