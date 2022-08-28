import React from 'react';
import { IDevice } from '@src/features/devices/types';
import { TableCellTypes } from '../../constants';
import { HeaderCellType } from '../../types';
import { HeaderInfoItem, HeaderList } from './comparisonHeader.styled';
import HeaderItemView from './HeaderItemView';

interface IProps {
  headerList: Array<HeaderCellType>;
}

function ComparisonHeaderView({ headerList }: IProps) {
  return (
    <HeaderList columns={headerList.length}>
      {headerList.map((item) => {
        if (item.type === TableCellTypes.HeaderInfo) {
          return (
            <HeaderInfoItem key={`header-${item.value}`}>
              {item.value}
            </HeaderInfoItem>
          );
        }

        return (
          <HeaderItemView key={`header-${item.id}`} device={item as IDevice} />
        );
      })}
    </HeaderList>
  );
}

export default ComparisonHeaderView;
