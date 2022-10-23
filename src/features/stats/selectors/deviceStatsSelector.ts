import { RootState } from '@src/app/store';

export const deviceStatsSelector = (state: RootState) => state.stats.items?.devices;
