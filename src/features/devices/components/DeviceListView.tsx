import React, { useRef, useState, RefObject } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import useContainerDimensions from '@common/hooks/main/useContainerDimensions';
import DeviceItemView from './DeviceItemView';
import useGetDevices from '../hooks/useGetDevices';
import {
  COLUMN_WIDTH,
  GUTTER_SIZE,
  LOADER_ITEMS_COUNT,
  ROW_HEIGHT,
} from '../constants';
import { GoToTopButton, GoToTopIcon } from '../styles/deviceList.styled';
import useGetMoreDevices from '../hooks/useGetMoreDevices';
import { IOnItemsRenderedParams } from '../types';
import useSaveListScrollPosition from '../hooks/useSaveListScrollPosition';
import getCountOfColumns from '../helpers/getCountOfColumns';
import calcAndGetCountOfRows from '../helpers/calcAndGetCountOfRows';

interface Props {
  containerRef: RefObject<HTMLElement>;
}

function DeviceListView({ containerRef }: Props) {
  const gridRef = useRef<Grid | null>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { items, isLoading } = useGetDevices();
  const { fetchMore, isLoadingMore } = useGetMoreDevices();
  const { rowIndexState, resetScrollPosition } = useSaveListScrollPosition();
  const { size } = useContainerDimensions(containerRef);

  const COLUMN_COUNT = getCountOfColumns(size.width);

  const ITEMS_COUNT = isLoading ? LOADER_ITEMS_COUNT : items.length;

  const DEFAULT_ROW_COUNT = calcAndGetCountOfRows({
    itemsCount: ITEMS_COUNT,
    columns: COLUMN_COUNT,
  });

  const ROW_COUNT = isLoadingMore ? DEFAULT_ROW_COUNT + 1 : DEFAULT_ROW_COUNT; // plus one row for loader in the bottom

  const isItemLoaded = (index: number) => index !== items.length - 1;

  const loadMoreDevices = (startIndex: number, stopIndex: number) => {
    if (stopIndex === items.length - 1 && !isLoading) fetchMore();
  };

  const handleScroll = ({ scrollTop }: { scrollTop: number }) => {
    const isNotVisible = !isVisible;

    if (scrollTop > ROW_HEIGHT * 2 && isNotVisible) setIsVisible(true);
    if (scrollTop < ROW_HEIGHT && isVisible) setIsVisible(false);
  };

  const goToTop = () => {
    gridRef.current?.scrollToItem({
      columnIndex: 0,
      rowIndex: 0,
    });

    setIsVisible(false);
    resetScrollPosition();
  };

  return (
    <>
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

              const setRefs = (node: Grid) => {
                if (typeof ref === 'function') ref(node);
                gridRef.current = node;
              };

              return (
                <Grid
                  ref={setRefs}
                  className="device-list-grid"
                  columnCount={COLUMN_COUNT}
                  columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
                  rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                  rowCount={ROW_COUNT}
                  itemData={{
                    items,
                    isLoading,
                    isLoadingMore,
                    COLUMN_COUNT,
                  }}
                  height={height}
                  width={width}
                  initialScrollTop={ROW_HEIGHT * rowIndexState}
                  onItemsRendered={newOnItemsRendered}
                  onScroll={handleScroll}
                >
                  {DeviceItemView}
                </Grid>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>

      {isVisible && (
        <GoToTopButton type="button" onClick={goToTop}>
          <GoToTopIcon />
        </GoToTopButton>
      )}
    </>
  );
}

export default DeviceListView;
