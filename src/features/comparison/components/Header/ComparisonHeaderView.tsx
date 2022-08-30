import React from 'react';
import { IDevice } from '@src/features/devices/types';
import { TableCellTypes } from '../../constants';
import { HeaderCellType } from '../../types';
import { HeaderInfoItem, HeaderList } from './comparisonHeader.styled';
import HeaderItemView from './HeaderItemView';

interface IProps {
  headerList: Array<HeaderCellType>;
  onDragEndColumn: (evt: React.MouseEvent) => void;
  onDragEnterColumn: (evt: React.MouseEvent) => void;
  onDragLeaveColumn: (evt: React.MouseEvent) => void;
}

function ComparisonHeaderView({ headerList, onDragEndColumn, onDragEnterColumn, onDragLeaveColumn }: IProps) {
  return (
    <HeaderList columns={headerList.length}>
      {headerList.map((item, idx) => {
        if (item.type === TableCellTypes.HeaderInfo) {
          return <HeaderInfoItem key={`header-${item.value}`}>{item.value}</HeaderInfoItem>;
        }

        return (
          <HeaderItemView
            columnId={idx}
            onDragEndColumn={onDragEndColumn}
            onDragEnterColumn={onDragEnterColumn}
            onDragLeaveColumn={onDragLeaveColumn}
            key={`header-${item.id}`}
            device={item as IDevice}
          />
        );
      })}
    </HeaderList>
  );
}

export default ComparisonHeaderView;
