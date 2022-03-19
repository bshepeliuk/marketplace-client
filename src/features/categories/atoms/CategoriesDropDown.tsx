import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { routes } from '@src/app/Router';
import { ICategory } from '../types';
import useGetCategories from '../hooks/useGetCategories';

const List = styled.ul`
  list-style-type: none;
  position: relative;
  z-index: 1;
  padding: 10px;
  background-color: rgba(236, 240, 241, 1);
  margin: 0;
`;

interface IProps {
  item: ICategory;
  closeDropDown: () => void;
}

function CategoriesDropDown() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { items } = useGetCategories();

  const toggleShow = () => setIsShow((prevIsShow) => !prevIsShow);
  const closeDropDown = () => setIsShow(false);

  return (
    <div>
      <button type="button" onClick={toggleShow}>
        <BsFillGrid3X3GapFill />
        Categories
      </button>

      {isShow && (
        <List>
          {items.map((item) => (
            <CategoryDropDownItem
              key={item.id}
              item={item}
              closeDropDown={closeDropDown}
            />
          ))}
        </List>
      )}
    </div>
  );
}

function CategoryDropDownItem({ item, closeDropDown }: IProps) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate({
      pathname: routes.devices,
      search: `?categoryId=${item.id}`,
    });

    closeDropDown();
  };

  return (
    <li key={item.id}>
      <button type="button" onClick={handleItemClick}>
        {item.name}
      </button>
    </li>
  );
}

export default CategoriesDropDown;
