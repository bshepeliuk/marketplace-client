import { RootState } from '@src/app/store';

export const transfersSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore, startChunkId, endChunkId, firstItemId } = state.transfers;

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
