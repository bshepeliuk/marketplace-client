import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '@src/app/Router';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { ICategory } from '../types';

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
  const items = useTypedSelector((state) => state.categories.items);

  const toggleShow = () => setIsShow((prevIsShow) => !prevIsShow);
  const closeDropDown = () => setIsShow(false);

  return (
    <div>
      <button type="button" onClick={toggleShow}>
        Categories
      </button>

      {isShow && (
        <List>
          {items.map((item) => (
            <CategoryItem
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

function CategoryItem({ item, closeDropDown }: IProps) {
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
