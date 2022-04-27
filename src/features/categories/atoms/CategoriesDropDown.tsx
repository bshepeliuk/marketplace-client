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
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 10px;
  background-color: rgba(236, 240, 241, 1);
  margin: 0;
  top: 61px;
  box-shadow: 3px 2px 38px 5px rgb(0 0 0 / 18%);
`;

const Wrap = styled.div`
  position: relative;
  margin-left: 50px;
`;

const CategoriesButton = styled.button`
  background-color: #e00027;
  border: none;
  color: #fff;
  border-radius: 4px;
  height: 40px;
  width: 170px;
  font-size: 16px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
    <Wrap>
      <CategoriesButton type="button" onClick={toggleShow}>
        <BsFillGrid3X3GapFill size="22" />
        Categories
      </CategoriesButton>

      {isShow && (
        <List>
          {items.map((item) => (
            <CategoryDropDownItem key={item.id} item={item} />
          ))}
        </List>
      )}
    </Wrap>
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
