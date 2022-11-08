import { RootState } from '@src/app/store';

export const cityStatsSelector = (state: RootState) => state.stats.items?.cities;
