import { routes } from '@src/app/Router';
import React from 'react';
import { ListItem, StyledLink } from '../../styles/categoriesList.styled';
import { ICategory } from '../../types';

interface IProps {
  category: ICategory;
  active: string | undefined;
}

function CategoryItemView(props: IProps) {
  const { category, active } = props;

  const isActive = active === category.name;
  const className = isActive ? 'active-category' : '';

  return (
    <ListItem key={category.id}>
      <StyledLink
        className={className}
        to={{
          pathname: routes.home,
          search: `?categoryId=${category.id}`,
        }}
      >
        {category.name}
      </StyledLink>
    </ListItem>
  );
}

export default CategoryItemView;
