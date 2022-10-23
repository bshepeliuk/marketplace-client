import { RootState } from '@src/app/store';

export const statusStatsSelector = (state: RootState) => state.stats.items?.statuses;
