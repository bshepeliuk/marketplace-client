import React, { useRef } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import useHandleScrollBySideBtnClick from '@common/hooks/useHandleScrollBySideBtnClick';
import useHandleScrollOnMouseEvents from '@common/hooks/useHandleScrollOnMouseEvents';
import useScrollOnTouchEvents from '@src/common/hooks/useScrollOnTouchEvents';
import useGetCategories from '../../hooks/useGetCategories';
import { List, Wrap, LeftArrowButton, RightArrowButton, ListItem } from '../../styles/categoriesList.styled';
import useGetCategoryId from '../../hooks/useGetCategoryId';
import AllCategoriesButton from './AllCategoriesButton';
import CategoryItemView from './CategoryItemView';
import RecentlyViewedLink from './RecentlyViewedListItem';
import CategoriesListLoader from './CategoriesListLoader';

function CategoriesListView() {
  const scrollWrapRef = useRef(null);
  const categoryId = useGetCategoryId();
  const { items, isLoading } = useGetCategories();
  // prettier-ignore
  const {
    isLeftVisible,
    isRightVisible,
    onLeftClick,
    onRightClick
  } = useHandleScrollBySideBtnClick(scrollWrapRef, items.length);
  const { onTouchMove, onTouchStart } = useScrollOnTouchEvents({ ref: scrollWrapRef });

  useHandleScrollOnMouseEvents({ ref: scrollWrapRef, deps: items });

  const active = items.find((item) => item.id === categoryId);

  if (isLoading) return <CategoriesListLoader />;

  return (
    <Wrap>
      <LeftArrowButton type="button" onClick={onLeftClick} isLeftVisible={isLeftVisible}>
        <MdArrowBackIosNew />
      </LeftArrowButton>

      <List ref={scrollWrapRef} onTouchMove={onTouchMove} onTouchStart={onTouchStart}>
        <RecentlyViewedLink />

        <ListItem>
          <AllCategoriesButton />
        </ListItem>

        {items.map((item) => (
          <CategoryItemView key={item.id} category={item} active={active?.name} />
        ))}
      </List>

      <RightArrowButton type="button" onClick={onRightClick} isRightVisible={isRightVisible}>
        <MdArrowForwardIos />
      </RightArrowButton>
    </Wrap>
  );
}

export default CategoriesListView;
