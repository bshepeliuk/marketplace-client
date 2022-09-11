import React from 'react';
import { List } from '../../styles/devicesByCategory.styled';
import { IDevice } from '../../types';
import DevicesByCategoryListItem from './DevicesByCategoryListItem';
import DevicesByCategoryListLoader from './DevicesByCategoryListLoader';

function DevicesByCategoryList({ items, isLoading }: { items: IDevice[]; isLoading: boolean }) {
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
