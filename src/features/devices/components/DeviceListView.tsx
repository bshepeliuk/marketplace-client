/* eslint-disable max-len */
import React, { useRef, useState, RefObject } from 'react';
import { FixedSizeGrid as Grid, ListOnItemsRenderedProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import useContainerDimensions from '@src/common/hooks/useContainerDimensions';
import DeviceItemView from './DeviceItemView';
import {
  COLUMN_WIDTH,
  GUTTER_SIZE,
  LOADER_ITEMS_COUNT,
  ROW_HEIGHT,
} from '../constants';
import { GoToTopButton, GoToTopIcon } from '../styles/deviceList.styled';
import { IDevice, IOnItemsRenderedParams } from '../types';
import useSaveListScrollPosition from '../hooks/useSaveListScrollPosition';
import getCountOfColumns from '../helpers/getCountOfColumns';
import calcAndGetCountOfRows from '../helpers/calcAndGetCountOfRows';
import '../styles/scrollbar.scss';
// eslint-disable-next-line no-unused-vars
type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

interface Props {
  containerRef: RefObject<HTMLElement>;
  isLoading: boolean;
  isLoadingMore: boolean;
  items: IDevice[];
  fetchMore: () => void;
}

function DeviceListView({
  items = [],
  isLoadingMore,
  isLoading,
  fetchMore,
  containerRef,
}: Props) {
  const gridRef = useRef<Grid | null>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { rowIndexState, resetScrollPosition } = useSaveListScrollPosition();
  const { size } = useContainerDimensions(containerRef);

  const COLUMN_COUNT = getCountOfColumns(size.width);

  const ITEMS_COUNT = isLoading ? LOADER_ITEMS_COUNT : items.length;

  const DEFAULT_ROW_COUNT = calcAndGetCountOfRows({
    itemsCount: ITEMS_COUNT,
    columns: COLUMN_COUNT,
  });
  // plus one row for loader in the bottom
  const ROW_COUNT = isLoadingMore ? DEFAULT_ROW_COUNT + 1 : DEFAULT_ROW_COUNT;

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

  const getNewOnItemsRendered = (onItemsRendered: OnItemsRendered) => {
    return (props: IOnItemsRenderedParams) => {
      const {
        overscanRowStartIndex,
        overscanColumnStartIndex,
        overscanRowStopIndex,
        overscanColumnStopIndex,
        visibleRowStartIndex,
        visibleColumnStartIndex,
        visibleRowStopIndex,
        visibleColumnStopIndex,
      } = props;

      const overscanStartIndex =
        overscanRowStartIndex * COLUMN_COUNT + overscanColumnStartIndex;
      const overscanStopIndex =
        overscanRowStopIndex * COLUMN_COUNT + overscanColumnStopIndex;
      const visibleStartIndex =
        visibleRowStartIndex * COLUMN_COUNT + visibleColumnStartIndex;
      const visibleStopIndex =
        visibleRowStopIndex * COLUMN_COUNT + visibleColumnStopIndex;

      onItemsRendered({
        overscanStartIndex,
        overscanStopIndex,
        visibleStartIndex,
        visibleStopIndex,
      });
    };
  };

  const getOwnRefSetter = (ref: any) => (node: Grid) => {
    if (typeof ref === 'function') ref(node);
    gridRef.current = node;
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
              const newOnItemsRendered = getNewOnItemsRendered(onItemsRendered);
              const setRef = getOwnRefSetter(ref);

              return (
                <Grid
                  ref={setRef}
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
