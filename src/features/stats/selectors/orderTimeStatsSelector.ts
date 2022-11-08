import { RootState } from '@src/app/store';

export const orderTimeStatsSelector = (state: RootState) => state.stats.items?.orderTime;
