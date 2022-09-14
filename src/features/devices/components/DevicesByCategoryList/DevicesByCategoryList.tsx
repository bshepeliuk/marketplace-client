import React from 'react';
import { List } from '../../styles/devicesByCategory.styled';
import { IDevice } from '../../types';
import DevicesByCategoryListItem from './DevicesByCategoryListItem';
import DevicesByCategoryListLoader from './DevicesByCategoryListLoader';

interface IProps {
  items: IDevice[];
  isLoading: boolean;
}

function DevicesByCategoryList({ items, isLoading }: IProps) {
  if (isLoading) return <DevicesByCategoryListLoader />;

  return (
    <List>
      {items.map((device) => {
        return <DevicesByCategoryListItem key={device.id} device={device} />;
      })}
    </List>
  );
}

export default DevicesByCategoryList;
