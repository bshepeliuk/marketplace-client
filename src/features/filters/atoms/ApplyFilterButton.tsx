import React, { useEffect } from 'react';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { useFilterContext } from '../context/FilterContext';
import { ApplyButton } from '../styles/filters.styled';

function ApplyFilterButton() {
  const categoryId = useGetCategoryId();
  const context = useFilterContext();
  // prettier-ignore
  const { btnVerticalOffset, showApplyBtn, setShowApplyBtn, hasSelectedItems } = context;

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
    >
      apply
    </ApplyButton>
  );
}

export default ApplyFilterButton;
