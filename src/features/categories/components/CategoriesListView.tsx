/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import useHandleScrollBySideBtnClick from '@src/common/hooks/useHandleScrollBySideBtnClick';
import useGetCategories from '../hooks/useGetCategories';
import {
  List,
  Wrap,
  ListItem,
  LeftArrowButton,
  RightArrowButton,
} from '../styles/categoriesList.styled';
import { ICategory } from '../types';
import useGetCategoryId from '../hooks/useGetCategoryId';
import GetAllDevicesButton from '../atoms/GetAllDevicesButton';
import CategoryItemView from './CategoryItemView';

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

export default CategoriesListView;
