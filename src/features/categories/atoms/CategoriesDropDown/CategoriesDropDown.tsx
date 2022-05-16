import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import usePrevious from '@src/common/hooks/usePrevious';
import { routes } from '@src/app/Router';
import { ICategory } from '../../types';
import useGetCategories from '../../hooks/useGetCategories';
import useGetCategoryId from '../../hooks/useGetCategoryId';
import { CategoriesButton, List, ListItem, Wrap } from './dropDown.styled';

function CategoriesDropDown() {
  const categoryId = useGetCategoryId();
  const prevCategoryId = usePrevious(categoryId);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleShow = () => setIsVisible((prevIsShow) => !prevIsShow);

  useEffect(() => {
    if (prevCategoryId) setIsVisible(false);
  }, [categoryId]);

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

function DropDownItem({ item }: { item: ICategory }) {
  const [params] = useSearchParams();
  const pathToSelectedCategory = `${routes.devices}?categoryId=${item.id}`;

  const isActive = Number(params.get('categoryId')) === item.id;

  return (
    <ListItem key={item.id} isActive={isActive}>
      <Link to={pathToSelectedCategory}>{item.name}</Link>
    </ListItem>
  );
}

export default CategoriesDropDown;
