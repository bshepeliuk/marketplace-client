import { RootState } from '@src/app/store';
import { TRANSFERS_LIMIT } from '../constants';
import { ITransfers } from '../types';

export const transfersChunkSelector = (state: RootState) => {
  const { items, hasMore, isError, isLoading, endingBefore } = state.transfers;

  const hasNoStartChunkId = endingBefore === null;
  const hasStartChunkId = !hasNoStartChunkId;

  let chunk: ITransfers = [];

  if (hasNoStartChunkId) {
    chunk = items.slice(0, TRANSFERS_LIMIT);
  }

  if (hasStartChunkId) {
    const startIdx = items.findIndex(({ id }) => id === endingBefore);
    chunk = items.slice(startIdx, startIdx + TRANSFERS_LIMIT);
  }

  return {
    hasMore,
    isError,
    isLoading,
    items: chunk,
  };
};
