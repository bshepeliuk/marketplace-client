import React from 'react';
import { ApplyButton } from '../styles/filters.styled';
import useFilterContext from '../hooks/useFilterContext';

function ApplyFilterButton() {
  const context = useFilterContext();

  const { apply, count } = context;
  // TODO: loader;
  return (
    <ApplyButton type="button" onClick={apply}>
      show - {count}
    </ApplyButton>
  );
}

export default ApplyFilterButton;
