import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import DeviceItemView from './DeviceItemView';
import useGetDevices from '../hooks/useGetDevices';
import {
  COLUMN_COUNT,
  COLUMN_WIDTH,
  GUTTER_SIZE,
  ROW_HEIGHT,
} from '../constants';
import { Wrap } from '../styles/deviceList.styled';

function DeviceListView() {
  const { items, isLoading } = useGetDevices();

  const ROW_COUNT = Math.ceil(items.length / COLUMN_COUNT);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Wrap>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            columnCount={COLUMN_COUNT}
            columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
            rowHeight={ROW_HEIGHT + GUTTER_SIZE}
            rowCount={ROW_COUNT}
            itemData={items}
            height={height}
            width={width}
          >
            {DeviceItemView}
          </Grid>
        )}
      </AutoSizer>
    </Wrap>
  );
}

export default DeviceListView;
