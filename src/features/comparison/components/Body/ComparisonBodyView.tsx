/* eslint-disable react/no-array-index-key */
import React from 'react';
import useCheckTypeOfComparisonCell from '../../hooks/useCheckTypeOfComparisonCell';
import useDraggableRowsComparisonTable from '../../hooks/useDraggableRowsComparisonTable';
import useGetComparisonTable from '../../hooks/useGetComparisonTable';
import { BodyHeaderItem, BodyList, BodyListItem } from './comparisonBody.styled';

function ComparisonBodyView() {
  const { table } = useGetComparisonTable();
  const { onDragEnd, onDragEnter, onDragLeave } = useDraggableRowsComparisonTable();
  const { isBodyFeatureKeyCell } = useCheckTypeOfComparisonCell();

  return (
    <>
      {table.body.map((rowList, rowIdx) => {
        return (
          <BodyList key={rowIdx} columns={rowList.length}>
            {rowList.map((item, colIdx) => {
              if (isBodyFeatureKeyCell(item)) {
                return (
                  <BodyHeaderItem
                    draggable
                    key={`${rowIdx}-${colIdx}`}
                    data-row-id={rowIdx}
                    onDragEnd={onDragEnd}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                  >
                    {item.value}
                  </BodyHeaderItem>
                );
              }

              return (
                <BodyListItem data-row-id={rowIdx} key={`${rowIdx}-${colIdx}`}>
                  {item.value}
                </BodyListItem>
              );
            })}
          </BodyList>
        );
      })}
    </>
  );
}

export default ComparisonBodyView;
