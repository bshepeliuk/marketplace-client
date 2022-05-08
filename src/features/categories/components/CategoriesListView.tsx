/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import styled from 'styled-components';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { getDevices } from '@src/features/devices/devicesSlice';
import useHandleScrollBySideBtnClick from '@src/common/hooks/useHandleScrollBySideBtnClick';
import useGetCategories from '../hooks/useGetCategories';
import {
  CategoryButton,
  List,
  Wrap,
  ListItem,
} from '../styles/categoriesList.styled';
import { ICategory } from '../types';
import useGetCategoryId from '../hooks/useGetCategoryId';

const ScrollArrowButton = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  position: relative;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.4);
  }
`;

export const LeftArrowButton = styled(ScrollArrowButton)<{
  isLeftVisible: boolean;
}>`
  display: ${({ isLeftVisible }) => {
    return isLeftVisible ? 'flex' : 'none';
  }};

  &::after {
    content: '';
    background: linear-gradient(to right, #fff 10%, rgba(249, 249, 249, 0) 90%);
    height: 32px;
    width: 32px;
    position: absolute;
    display: block;
    left: 25px;
  }
`;
export const RightArrowButton = styled(ScrollArrowButton)<{
  isRightVisible: boolean;
}>`
  display: ${({ isRightVisible }) => {
    return isRightVisible ? 'flex' : 'none';
  }};

  &::before {
    content: '';
    background: linear-gradient(to left, #fff 20%, rgba(255, 255, 255, 0) 80%);
    height: 32px;
    width: 32px;
    display: block;
    position: absolute;
    right: 25px;
  }
`;

const useGetDevicesByRequest = () => {
  const categoryId = useGetCategoryId();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const getAll = () => {
    if (categoryId === undefined) return;

    dispatch(getDevices({ offset: 0, limit: 20 }));

    navigate({
      pathname: '/',
      search: undefined,
    });
  };

  return {
    getAll,
  };
};

function GetAllDevicesButton(props: {
  active: string | null;
  onAllClick: () => void;
}) {
  const { getAll } = useGetDevicesByRequest();

  const isActive = props.active === null;

  const handleClick = () => {
    getAll();
    props.onAllClick();
  };

  return (
    <CategoryButton type="button" onClick={handleClick} isActive={isActive}>
      All
    </CategoryButton>
  );
}

function CategoriesListView() {
  const scrollWrapRef = useRef(null);
  const categoryId = useGetCategoryId();
  const { items, isLoading } = useGetCategories();
  const [active, setActive] = useState<null | string>(null);
  // prettier-ignore
  const {
    isLeftVisible,
    isRightVisible,
    onLeftClick,
    onRightClick
  } = useHandleScrollBySideBtnClick(scrollWrapRef, items.length);

  useEffect(() => {
    const category = items.find((item) => item.id === categoryId);

    if (category) setActive(category.name);
  }, [items]);

  const handleClick = (category: ICategory) => {
    setActive(category.name);
  };

  const onAllClick = () => setActive(null);

  return (
    <Wrap>
      <LeftArrowButton
        type="button"
        onClick={onLeftClick}
        isLeftVisible={isLeftVisible}
      >
        <MdArrowBackIosNew />
      </LeftArrowButton>

      <List ref={scrollWrapRef}>
        {isLoading && <div>Loading...</div>}

        <ListItem>
          <GetAllDevicesButton active={active} onAllClick={onAllClick} />
        </ListItem>

        {items.map((item) => (
          <CategoryItemView
            key={item.id}
            category={item}
            currentCategoryId={categoryId}
            onClick={handleClick}
            active={active}
          />
        ))}
      </List>

      <RightArrowButton
        type="button"
        onClick={onRightClick}
        isRightVisible={isRightVisible}
      >
        <MdArrowForwardIos />
      </RightArrowButton>
    </Wrap>
  );
}

interface IProps {
  category: ICategory;
  currentCategoryId: number | undefined;
  // eslint-disable-next-line no-unused-vars
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

export default CategoriesListView;
