import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import DeviceItemView from './DeviceItemView';
import useGetDevices from './hooks/useGetDevices';

// Header - 18px;
const Wrap = styled.div`
  flex: 1 1 auto;
  height: calc(100vh - 18px);
`;

function DeviceListView() {
  const { items, isLoading } = useGetDevices();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Wrap>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemData={items}
            itemSize={300}
            itemCount={items.length}
            width={width}
          >
            {DeviceItemView}
          </List>
        )}
      </AutoSizer>
    </Wrap>
  );
}

export default DeviceListView;
