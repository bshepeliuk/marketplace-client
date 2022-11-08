import { RootState } from '@src/app/store';

export const orderMonthStatsSelector = (state: RootState) => state.stats.items?.orderMonth;
