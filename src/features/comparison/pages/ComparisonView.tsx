import React from 'react';
import useGetComparisonTableRows from '../hooks/useGetComparisonTableRows';
import ComparisonHeaderView from '../components/Header/ComparisonHeaderView';
import ComparisonBodyView from '../components/Body/ComparisonBodyView';
import { ComparisonTable } from '../styles/comparisonTable.styled';

function ComparisonView() {
  // prettier-ignore
  const {
    headerList,
    bodyList,
    hasNoItemsForComparison
   } = useGetComparisonTableRows();

  if (hasNoItemsForComparison) {
    return (
      <ComparisonTable>
        You have not added devices for comparison yet.
      </ComparisonTable>
    );
  }

  return (
    <ComparisonTable>
      <ComparisonHeaderView headerList={headerList} />
      <ComparisonBodyView bodyList={bodyList} />
    </ComparisonTable>
  );
}

export default ComparisonView;
