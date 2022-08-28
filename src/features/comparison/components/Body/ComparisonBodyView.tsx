/* eslint-disable react/no-array-index-key */
import React from 'react';
import { TableCellTypes } from '../../constants';
import {
  BodyHeaderItem,
  BodyList,
  BodyListItem,
} from './comparisonBody.styled';

interface IBodyListItem {
  type: typeof TableCellTypes.FeatureKey | typeof TableCellTypes.FeatureValue;
  value: string;
}

interface IBodyList {
  bodyList: Array<IBodyListItem[]>;
}

function ComparisonBodyView({ bodyList }: IBodyList) {
  return (
    <>
      {bodyList.map((rowList, rowIdx) => {
        return (
          <BodyList key={rowIdx} columns={rowList.length}>
            {rowList.map((item, colIdx) => {
              if (item.type === TableCellTypes.FeatureKey) {
                return (
                  <BodyHeaderItem key={`${rowIdx}-${colIdx}`}>
                    {item.value}
                  </BodyHeaderItem>
                );
              }

              return (
                <BodyListItem key={`${rowIdx}-${colIdx}`}>
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
