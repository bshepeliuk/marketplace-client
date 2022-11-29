import { RootState } from '@src/app/store';

export const transfersSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore, endingBefore, startingAfter, firstItemId, lastItemId } = state.transfers;

  return {
    items,
    isLoading,
    isError,
    hasMore,
    endingBefore,
    startingAfter,
    firstItemId,
    lastItemId,
  };
};
