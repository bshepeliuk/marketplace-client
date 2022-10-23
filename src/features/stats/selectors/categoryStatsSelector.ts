import { RootState } from '@src/app/store';

export const categoryStatsSelector = (state: RootState) => state.stats.items?.categories;
