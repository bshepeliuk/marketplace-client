import React from 'react';
import { HeaderInfoItem, HeaderList } from './comparisonHeader.styled';
import HeaderItemView from './HeaderItemView';
import useGetComparisonTable from '../../hooks/useGetComparisonTable';
import useDraggableColumnComparisonTable from '../../hooks/useDraggableColumnComparisonTable';
import useCheckTypeOfComparisonCell from '../../hooks/useCheckTypeOfComparisonCell';

function ComparisonHeaderView() {
  const { table } = useGetComparisonTable();
  const { onDragEnd, onDragEnter, onDragLeave } = useDraggableColumnComparisonTable();
  const { isHeaderInfoCell } = useCheckTypeOfComparisonCell();

  return (
    <HeaderList columns={table.header.length}>
      {table.header.map((item, idx) => {
        if (isHeaderInfoCell(item)) {
          return <HeaderInfoItem key={`header-${item.value}`}>{item.value}</HeaderInfoItem>;
        }

        return (
          <HeaderItemView
            key={`header-${item.id}`}
            columnId={idx}
            device={item}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
          />
        );
      })}
    </HeaderList>
  );
}

export default ComparisonHeaderView;
