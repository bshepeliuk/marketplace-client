import { RootState } from '@src/app/store';

export const customerStatsSelector = (state: RootState) => state.stats.items?.customers;
