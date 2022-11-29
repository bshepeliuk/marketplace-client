import { RootState } from '@src/app/store';

export const payoutsSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore, endingBefore, startingAfter, firstItemId, lastItemId } = state.payouts;

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
