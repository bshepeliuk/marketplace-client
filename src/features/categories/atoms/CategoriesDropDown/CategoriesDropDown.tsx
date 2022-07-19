import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { routes } from '@src/app/Router';
import { ICategory } from '../../types';
import useGetCategories from '../../hooks/useGetCategories';
import { CategoriesButton, List, ListItem, Wrap } from './dropDown.styled';

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
    <List>
      {items.map((item) => (
        <DropDownItem key={item.id} item={item} />
      ))}
    </List>
  );
}

export const CategoryLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;

  &:hover {
    color: #70a1ff;
  }

  & .active-category_1 {
    color: #70a1ff;
  }
`;

function DropDownItem({ item }: { item: ICategory }) {
  const [params] = useSearchParams();

  const isActive = Number(params.get('categoryId')) === item.id;

  return (
    <ListItem key={item.id} isActive={isActive}>
      <Link to={{ pathname: routes.devices, search: `?categoryId=${item.id}` }}>
        {item.name}
      </Link>
    </ListItem>
  );
}

export default CategoriesDropDown;
