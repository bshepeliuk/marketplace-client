import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { routes } from '@src/app/Router';
import { ICategory } from '../../types';
import useGetCategories from '../../hooks/useGetCategories';
import { CategoriesButton, CategoryLink, List, Wrap } from './dropDown.styled';

function CategoriesDropDown() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleShow = () => setIsVisible((prevIsShow) => !prevIsShow);

  useEffect(() => {
    setIsVisible(false);
  }, [location]);

  return (
    <Wrap>
      <CategoriesButton type="button" onClick={toggleShow}>
        <BsFillGrid3X3GapFill size="22" />
        Categories
      </CategoriesButton>

      {isVisible && <DropDownList />}
    </Wrap>
  );
}

function DropDownList() {
  const { items } = useGetCategories();

  return (
    <List className="custom-scrollbar">
      {items.map((item) => (
        <DropDownItem key={item.id} item={item} />
      ))}
    </List>
  );
}

function DropDownItem({ item }: { item: ICategory }) {
  const location = useLocation();
  const [params] = useSearchParams();

  const isActive =
    Number(params.get('categoryId')) === item.id &&
    location.pathname === routes.devices;

  const className = isActive ? 'active-category' : '';

  return (
    <li key={item.id}>
      <CategoryLink
        className={className}
        to={{ pathname: routes.devices, search: `?categoryId=${item.id}` }}
      >
        {item.name}
      </CategoryLink>
    </li>
  );
}

export default CategoriesDropDown;
