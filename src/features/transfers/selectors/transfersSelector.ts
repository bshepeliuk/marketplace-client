import { RootState } from '@src/app/store';

export const transfersSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore } = state.transfers;

  return {
    items,
    isLoading,
    isError,
    hasMore,
  };
};
