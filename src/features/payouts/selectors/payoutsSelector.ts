import { RootState } from '@src/app/store';

export const payoutsSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore } = state.payouts;

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};
