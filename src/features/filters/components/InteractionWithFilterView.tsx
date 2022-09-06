import React, { useEffect } from 'react';
import usePrevious from '@src/common/hooks/usePrevious';
import useGetCategoryId from '@src/features/categories/hooks/useGetCategoryId';
import useFilterContext from '../hooks/useFilterContext';
import ClearFilterButton from '../atoms/ClearFilterButton';
import ApplyFilterButton from '../atoms/ApplyFilterButton';
import { Wrap } from '../styles/InteractionWithFilter.styled';

function InteractionWithFilterView() {
  const categoryId = useGetCategoryId();
  const context = useFilterContext();
  // prettier-ignore
  const {
    setIsShownApplyBtn,
    hasSelectedItems,
    btnOffsetY,
    isShownApplyBtn,
  } = context;

  const prevOffset = usePrevious(btnOffsetY);

  useEffect(() => {
    setIsShownApplyBtn(false);
  }, [categoryId]);

  useEffect(() => {
    if (!hasSelectedItems) setIsShownApplyBtn(false);
  }, [hasSelectedItems]);

  return (
    <Wrap btnOffsetY={btnOffsetY} shouldShow={isShownApplyBtn} prevOffset={prevOffset}>
      <ClearFilterButton />
      <ApplyFilterButton />
    </Wrap>
  );
}

export default InteractionWithFilterView;
