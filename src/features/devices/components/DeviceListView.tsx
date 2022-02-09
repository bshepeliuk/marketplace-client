import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
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
import useGetMoreDevices from '../hooks/useGetMoreDevices';
import { IOnItemsRenderedParams } from '../types';
import useSaveDeviceListPosition from '../hooks/useSaveDeviceListPosition';

function DeviceListView() {
  const { items, isLoading } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();
  const { rowIndexState } = useSaveDeviceListPosition();

  const ROW_COUNT = Math.ceil(items.length / COLUMN_COUNT);

  const rowCount = isLoadingMore ? ROW_COUNT + 1 : ROW_COUNT;
  const isItemLoaded = (index: number) => index !== items.length - 1;

  if (isLoading) return <div>Loading...</div>;

  return (
    <Wrap>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={items.length}
            loadMoreItems={(startIndex: number, stopIndex: number) => {
              if (stopIndex === items.length - 1) fetchMore();
            }}
            threshold={0}
          >
            {({ ref, onItemsRendered }) => {
              const newOnItemsRendered = (props: IOnItemsRenderedParams) => {
                onItemsRendered({
                  overscanStartIndex:
                    props.overscanRowStartIndex * COLUMN_COUNT +
                    props.overscanColumnStartIndex,
                  overscanStopIndex:
                    props.overscanRowStopIndex * COLUMN_COUNT +
                    props.overscanColumnStopIndex,
                  visibleStartIndex:
                    props.visibleRowStartIndex * COLUMN_COUNT +
                    props.visibleColumnStartIndex,
                  visibleStopIndex:
                    props.visibleRowStopIndex * COLUMN_COUNT +
                    props.visibleColumnStopIndex,
                });
              };

              return (
                <Grid
                  ref={ref}
                  className="device-list-grid"
                  columnCount={COLUMN_COUNT}
                  columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
                  rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                  rowCount={rowCount}
                  itemData={items}
                  height={height}
                  width={width}
                  initialScrollTop={ROW_HEIGHT * rowIndexState}
                  onItemsRendered={newOnItemsRendered}
                >
                  {DeviceItemView}
                </Grid>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Wrap>
  );
}

export default DeviceListView;
