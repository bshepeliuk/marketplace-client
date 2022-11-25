import { RootState } from '@src/app/store';

export const chargesSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore, startChunkId, endChunkId, firstItemId } = state.charges;

  return {
    items,
    isLoading,
    isError,
    hasMore,
    startChunkId,
    endChunkId,
    firstItemId,
  };
};
