import { RootState } from '@src/app/store';
import { CHARGES_LIMIT } from '../constants';
import { ICharges } from '../types';

export const chargesChunkSelector = (state: RootState) => {
  const { items, hasMore, isError, isLoading, endingBefore } = state.charges;

  let chunk: ICharges = [];

  if (endingBefore === null) chunk = items.slice(0, CHARGES_LIMIT);

  if (endingBefore !== null) {
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
