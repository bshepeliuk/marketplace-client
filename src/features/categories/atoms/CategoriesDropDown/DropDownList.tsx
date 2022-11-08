import { routes } from '@src/app/Router';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import useGetCategories from '../../hooks/useGetCategories';
import { ICategory } from '../../types';
import { CategoryLink, List, ListItem } from './dropDown.styled';

interface IListProps {
  onLeave: () => void;
}

function DropDownList({ onLeave }: IListProps) {
  const { items } = useGetCategories();

  return (
    <List className="custom-scrollbar" onMouseLeave={onLeave}>
      {items.map((item) => (
        <DropDownItem key={item.id} item={item} />
      ))}
    </List>
  );
}

interface IItemProps {
  item: ICategory;
}

function DropDownItem({ item }: IItemProps) {
  const location = useLocation();
  const [params] = useSearchParams();

  const isActive = Number(params.get('categoryId')) === item.id && location.pathname === routes.devices;

  const className = isActive ? 'active-category' : '';

  return (
    <ListItem key={item.id} className={className}>
      <CategoryLink className={className} to={{ pathname: routes.devices, search: `?categoryId=${item.id}` }}>
        {item.name}
      </CategoryLink>
    </ListItem>
  );
}

export default DropDownList;
