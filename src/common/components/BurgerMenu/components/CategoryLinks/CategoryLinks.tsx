import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useGetCategories from '@src/features/categories/hooks/useGetCategories';
import { routes } from '@src/app/Router';
import { ICategory } from '@src/features/categories/types';
import { CategoryLink, CategoryList } from './categoryLinks.styled';

function CategoryLinks() {
  const { items } = useGetCategories();

  return (
    <CategoryList>
      {items.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </CategoryList>
  );
}

function CategoryItem({ category }: { category: ICategory }) {
  const [params] = useSearchParams();

  const categoryId = Number(params.get('categoryId'));
  // FIXME: activeClassName does not work;
  const isActive = categoryId === category.id;
  const className = isActive ? 'active-category' : '';

  return (
    <li>
      <CategoryLink
        className={className}
        to={{
          pathname: routes.devices,
          search: `?categoryId=${category.id}`,
        }}
      >
        {category.name}
      </CategoryLink>
    </li>
  );
}

export default CategoryLinks;
