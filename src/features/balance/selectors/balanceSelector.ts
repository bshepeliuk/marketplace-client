import { RootState } from '@src/app/store';

export const balanceSelector = (state: RootState) => state.balance.current;
