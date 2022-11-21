import { RootState } from '@src/app/store';

export const chargesSelector = (state: RootState) => {
  const { items, isLoading, isError, hasMore } = state.charges;
  return { items, isLoading, isError, hasMore };
};
