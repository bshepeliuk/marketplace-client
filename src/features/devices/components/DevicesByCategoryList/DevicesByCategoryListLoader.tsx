import React from 'react';
import { List, LoaderListItem } from '../../styles/devicesByCategory.styled';
import DeviceLoaderView from '../DeviceLoaderView';

function DevicesByCategoryListLoader() {
  return (
    <List>
      {Array.from({ length: 10 }).map((_, idx) => (
        <LoaderListItem key={idx}>
          <DeviceLoaderView />
        </LoaderListItem>
      ))}
    </List>
  );
}

export default DevicesByCategoryListLoader;
