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
    btnOffsetY,
    showApplyBtn,
  } = context;

  const prevOffset = usePrevious(btnOffsetY);

  useEffect(() => {
    setShowApplyBtn(false);
  }, [categoryId]);

  useEffect(() => {
    if (!hasSelectedItems) setShowApplyBtn(false);
  }, [hasSelectedItems]);

  return (
    <Wrap
      btnOffsetY={btnOffsetY}
      shouldShow={showApplyBtn}
      prevOffset={prevOffset}
    >
      <ClearFilterButton />
      <ApplyFilterButton />
    </Wrap>
  );
}

export default InteractionWithFilterView;
