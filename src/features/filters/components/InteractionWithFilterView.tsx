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
    setShowApplyBtn,
    hasSelectedItems,
    btnVerticalOffset,
    showApplyBtn,
  } = context;

  const prevOffset = usePrevious(btnVerticalOffset);

  useEffect(() => {
    setShowApplyBtn(false);
  }, [categoryId]);

  useEffect(() => {
    if (!hasSelectedItems) setShowApplyBtn(false);
  }, [hasSelectedItems]);

  return (
    <Wrap
      btnVerticalOffset={btnVerticalOffset}
      shouldShow={showApplyBtn}
      prevOffset={prevOffset}
    >
      <ClearFilterButton />
      <ApplyFilterButton />
    </Wrap>
  );
}

export default InteractionWithFilterView;
