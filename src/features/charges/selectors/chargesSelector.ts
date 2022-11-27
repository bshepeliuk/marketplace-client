import { RootState } from '@src/app/store';

export const chargesSelector = (state: RootState) => {
  const { items, startingAfter, endingBefore, firstItemId, lastItemId, isLoading } = state.charges;

  return {
    items,
    startingAfter,
    endingBefore,
    firstItemId,
    lastItemId,
    isLoading,
  };
};
