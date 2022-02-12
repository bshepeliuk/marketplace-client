import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import useWindowWidthResize from '@common/hooks/main/useWindowWidthResize';
import DeviceItemView from './DeviceItemView';
import useGetDevices from '../hooks/useGetDevices';
import {
  COLUMN_WIDTH,
  GUTTER_SIZE,
  LOADER_ITEMS_COUNT,
  ROW_HEIGHT,
} from '../constants';
import { Wrap } from '../styles/deviceList.styled';
import useGetMoreDevices from '../hooks/useGetMoreDevices';
import { IOnItemsRenderedParams } from '../types';
import useSaveDeviceListPosition from '../hooks/useSaveDeviceListPosition';
import getCountOfColumns from '../helpers/getCountOfColumns';
import calcAndGetCountOfRows from '../helpers/calcAndGetCountOfRows';

function DeviceListView() {
  const { items, isLoading } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();
  const { rowIndexState } = useSaveDeviceListPosition();
  const { size } = useWindowWidthResize();

  const COLUMN_COUNT = getCountOfColumns(size.width);

  const ITEMS_COUNT = isLoading ? LOADER_ITEMS_COUNT : items.length;

  const DEFAULT_ROW_COUNT = calcAndGetCountOfRows({
    itemsCount: ITEMS_COUNT,
    columns: COLUMN_COUNT,
  });

  const ROW_COUNT = isLoadingMore ? DEFAULT_ROW_COUNT + 1 : DEFAULT_ROW_COUNT;

  const isItemLoaded = (index: number) => index !== items.length - 1;

  const loadMoreDevices = (startIndex: number, stopIndex: number) => {
    if (stopIndex === items.length - 1 && !isLoading) fetchMore();
  };

  return (
    <Wrap>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={ITEMS_COUNT}
            loadMoreItems={loadMoreDevices}
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
                  rowCount={ROW_COUNT}
                  itemData={{ items, isLoading, isLoadingMore, COLUMN_COUNT }}
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
