import React, { useEffect } from 'react';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { useFilterContext } from '../context/FilterContext';
import { ApplyButton } from '../styles/filters.styled';

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
      apply
    </ApplyButton>
  );
}

export default ApplyFilterButton;
