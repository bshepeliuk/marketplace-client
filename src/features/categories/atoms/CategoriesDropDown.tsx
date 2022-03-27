import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import usePrevious from '@src/common/hooks/usePrevious';
import { routes } from '@src/app/Router';
import { ICategory } from '../types';
import useGetCategories from '../hooks/useGetCategories';
import useGetCategoryId from '../hooks/useGetCategoryId';

const List = styled.ul`
  list-style-type: none;
  position: relative;
  z-index: 1;
  padding: 10px;
  background-color: rgba(236, 240, 241, 1);
  margin: 0;
`;

function CategoriesDropDown() {
  const categoryId = useGetCategoryId();
  const prevCategoryId = usePrevious(categoryId);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { items } = useGetCategories();

  const toggleShow = () => setIsShow((prevIsShow) => !prevIsShow);

  useEffect(() => {
    if (prevCategoryId) setIsShow(false);
  }, [categoryId]);

  return (
    <div>
      <button type="button" onClick={toggleShow}>
        <BsFillGrid3X3GapFill />
        Categories
      </button>

      {isShow && (
        <List>
          {items.map((item) => (
            <CategoryDropDownItem key={item.id} item={item} />
          ))}
        </List>
      )}
    </div>
  );
}

function CategoryDropDownItem({ item }: { item: ICategory }) {
  const pathToSelectedCategory = `${routes.devices}?categoryId=${item.id}`;

  return (
    <li key={item.id}>
      <Link to={pathToSelectedCategory}>{item.name}</Link>
    </li>
  );
}

export default CategoriesDropDown;
