import React from 'react';
import LoaderView from '@common/components/Loader/Loader';
import { ApplyButton } from '../styles/filters.styled';
import useFilterContext from '../hooks/useFilterContext';
import useGetCountOfDevices from '../hooks/useGetCountOfDevices';

function ApplyFilterButton() {
  const { count, isLoading } = useGetCountOfDevices();
  const context = useFilterContext();

  const { apply } = context;

  const content = isLoading ? (
    <LoaderView size={10} color="#3498db" strokeWidth={1} />
  ) : (
    count
  );

  return (
    <ApplyButton type="button" onClick={apply}>
      show - {content}
    </ApplyButton>
  );
}

export default ApplyFilterButton;
