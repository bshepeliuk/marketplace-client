import { RootState } from '@src/app/store';
import { PAYOUTS_LIMIT } from '../constants';
import { IPayouts } from '../types';

export const payoutsChunkSelector = (state: RootState) => {
  const { items, hasMore, isError, isLoading, endingBefore } = state.payouts;

  const hasNoStartChunkId = endingBefore === null;
  const hasStartChunkId = !hasNoStartChunkId;

  let chunk: IPayouts = [];

  if (hasNoStartChunkId) {
    chunk = items.slice(0, PAYOUTS_LIMIT);
  }

  if (hasStartChunkId) {
    const startIdx = items.findIndex(({ id }) => id === endingBefore);
    chunk = items.slice(startIdx, startIdx + PAYOUTS_LIMIT);
  }

  return {
    hasMore,
    isError,
    isLoading,
    items: chunk,
  };
};
