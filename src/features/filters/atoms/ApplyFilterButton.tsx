import React, { useEffect } from 'react';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { ApplyButton } from '../styles/filters.styled';
import useFilterContext from '../hooks/useFilterContext';

function ApplyFilterButton() {
  const categoryId = useGetCategoryId();
  const context = useFilterContext();

  const {
    btnVerticalOffset,
    showApplyBtn,
    setShowApplyBtn,
    hasSelectedItems,
    apply,
  } = context;

  useEffect(() => {
    setShowApplyBtn(false);
  }, [categoryId]);

  useEffect(() => {
    if (!hasSelectedItems) setShowApplyBtn(false);
  }, [hasSelectedItems]);

  return (
    <ApplyButton
      type="button"
      btnVerticalOffset={btnVerticalOffset}
      shouldShow={showApplyBtn}
      onClick={apply}
    >
      show
    </ApplyButton>
  );
}

export default ApplyFilterButton;
