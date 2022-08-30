import React from 'react';
import useGetComparisonTableRows from '../hooks/useGetComparisonTableRows';
import ComparisonHeaderView from '../components/Header/ComparisonHeaderView';
import ComparisonBodyView from '../components/Body/ComparisonBodyView';
import { ComparisonTable } from '../styles/comparisonTable.styled';
import useDraggableColumnComparisonTable from '../hooks/useDraggableColumnComparisonTable';
import useDraggableRowsComparisonTable from '../hooks/useDraggableRowsComparisonTable';

function ComparisonView() {
  const { table, hasNoItemsForComparison } = useGetComparisonTableRows();
  const { onDragEndColumn, onDragEnterColumn, onDragLeaveColumn } = useDraggableColumnComparisonTable();
  const { onDragEndRow, onDragEnterRow, onDragLeaveRow } = useDraggableRowsComparisonTable();

  if (hasNoItemsForComparison) {
    return <ComparisonTable>You have not added devices for comparison yet.</ComparisonTable>;
  }

  return (
    <ComparisonTable>
      <ComparisonHeaderView
        headerList={table.header}
        onDragEndColumn={onDragEndColumn}
        onDragEnterColumn={onDragEnterColumn}
        onDragLeaveColumn={onDragLeaveColumn}
      />
      <ComparisonBodyView
        bodyList={table.body}
        onDragEndRow={onDragEndRow}
        onDragLeaveRow={onDragLeaveRow}
        onDragEnterRow={onDragEnterRow}
      />
    </ComparisonTable>
  );
}

export default ComparisonView;
