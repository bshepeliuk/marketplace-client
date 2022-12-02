import { RootState } from '@src/app/store';

export const balanceSelector = (state: RootState) => ({
  balance: state.balance.current,
  isLoading: state.balance.isLoading,
});
