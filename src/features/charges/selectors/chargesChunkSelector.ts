import { RootState } from '@src/app/store';
import { CHARGES_LIMIT } from '../constants';
import { ICharges } from '../types';

export const chargesChunkSelector = (state: RootState) => {
  const { items, hasMore, isError, isLoading, endingBefore } = state.charges;

  const hasNoStartChunkId = endingBefore === null;
  const hasStartChunkId = !hasNoStartChunkId;

  let chunk: ICharges = [];

  if (hasNoStartChunkId) {
    chunk = items.slice(0, CHARGES_LIMIT);
  }

  if (hasStartChunkId) {
    const startIdx = items.findIndex(({ id }) => id === endingBefore);
    chunk = items.slice(startIdx, startIdx + CHARGES_LIMIT);
  }

  return {
    hasMore,
    isError,
    isLoading,
    items: chunk,
  };
};
