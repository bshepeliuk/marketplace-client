/* eslint-disable react/no-array-index-key */
import React from 'react';
import { TableCellTypes } from '../../constants';
import { BodyHeaderItem, BodyList, BodyListItem } from './comparisonBody.styled';

interface IBodyListItem {
  type: typeof TableCellTypes.FeatureKey | typeof TableCellTypes.FeatureValue;
  value: string;
}

interface IBodyList {
  bodyList: Array<IBodyListItem[]>;
  onDragEndRow: (evt: React.MouseEvent) => void;
  onDragEnterRow: (evt: React.MouseEvent) => void;
  onDragLeaveRow: (evt: React.MouseEvent) => void;
}

function ComparisonBodyView({ bodyList, onDragEndRow, onDragEnterRow, onDragLeaveRow }: IBodyList) {
  return (
    <>
      {bodyList.map((rowList, rowIdx) => {
        return (
          <BodyList key={rowIdx} columns={rowList.length}>
            {rowList.map((item, colIdx) => {
              if (item.type === TableCellTypes.FeatureKey) {
                return (
                  <BodyHeaderItem
                    draggable
                    data-row-id={rowIdx}
                    onDragEnd={onDragEndRow}
                    onDragEnter={onDragEnterRow}
                    onDragLeave={onDragLeaveRow}
                    key={`${rowIdx}-${colIdx}`}
                  >
                    {item.value}
                  </BodyHeaderItem>
                );
              }

              return (
                <BodyListItem
                  draggable
                  data-row-id={rowIdx}
                  onDragEnd={onDragEndRow}
                  onDragEnter={onDragEnterRow}
                  onDragLeave={onDragLeaveRow}
                  key={`${rowIdx}-${colIdx}`}
                >
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
