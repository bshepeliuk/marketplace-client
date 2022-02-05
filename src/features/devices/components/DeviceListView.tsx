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

function DeviceListView() {
  const { items, isLoading } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();

  const ROW_COUNT = Math.ceil(items.length / COLUMN_COUNT);

  if (isLoading) return <div>Loading...</div>;

  const rowCount = isLoadingMore ? ROW_COUNT + 1 : ROW_COUNT;

  return (
    <Wrap>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            threshold={0}
            isItemLoaded={() => false}
            itemCount={items.length}
            loadMoreItems={(startIndex: number, stopIndex: number) => {
              if (startIndex + stopIndex === items.length) {
                fetchMore();
              }
            }}
          >
            {({ ref, onItemsRendered }) => {
              const newOnItemsRendered = (props: IOnItemsRenderedParams) => {
                const {
                  overscanRowStartIndex,
                  overscanRowStopIndex,
                  overscanColumnStopIndex,
                } = props;

                const endCol = overscanColumnStopIndex + 1;
                const startRow = overscanRowStartIndex;
                const endRow = overscanRowStopIndex;

                const visibleStartIndex = startRow * endCol;
                const visibleStopIndex = endRow * endCol;

                onItemsRendered({
                  visibleStartIndex,
                  visibleStopIndex,
                  overscanStartIndex: overscanRowStartIndex,
                  overscanStopIndex: overscanRowStopIndex,
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
