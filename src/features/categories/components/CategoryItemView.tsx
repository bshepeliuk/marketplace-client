import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryButton, ListItem } from '../styles/categoriesList.styled';
import { ICategory } from '../types';

interface IProps {
  category: ICategory;
  currentCategoryId: number | undefined;
  onClick: (category: ICategory) => void;
  active: string | null;
}

function CategoryItemView(props: IProps) {
  const navigate = useNavigate();

  const { category, currentCategoryId, onClick, active } = props;

  const isActive = active === category.name;

  const handleClick = () => {
    if (currentCategoryId === category.id) return;

    onClick(category);
    navigate({ pathname: '/', search: `?categoryId=${category.id}` });
  };

  return (
    <ListItem key={category.id}>
      <CategoryButton type="button" onClick={handleClick} isActive={isActive}>
        {category.name}
      </CategoryButton>
    </ListItem>
  );
}

export default CategoryItemView;
