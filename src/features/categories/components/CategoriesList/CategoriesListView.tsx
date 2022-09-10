import React, { useRef } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import useHandleScrollBySideBtnClick from '@common/hooks/useHandleScrollBySideBtnClick';
import useGetCategories from '../../hooks/useGetCategories';
import { List, Wrap, LeftArrowButton, RightArrowButton } from '../../styles/categoriesList.styled';
import useGetCategoryId from '../../hooks/useGetCategoryId';
import AllDevicesLink from './AllDevicesListItem';
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

  const active = items.find((item) => item.id === categoryId);

  if (isLoading) return <CategoriesListLoader />;

  return (
    <Wrap>
      <LeftArrowButton type="button" onClick={onLeftClick} isLeftVisible={isLeftVisible}>
        <MdArrowBackIosNew />
      </LeftArrowButton>

      <List ref={scrollWrapRef}>
        <RecentlyViewedLink />

        <AllDevicesLink />

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
