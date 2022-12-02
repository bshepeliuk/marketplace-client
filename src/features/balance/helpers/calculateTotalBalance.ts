import { IBalanceItem } from '../types';

const calculateTotalBalance = (items: IBalanceItem[]) => {
  const balanceByCurrency = items.reduce(
    (prev, current) => ({
      ...prev,
      [current.currency]: current.amount + (prev[current.currency] || 0),
    }),
    {} as Record<string, number>,
  );

  return Object.entries(balanceByCurrency).map(([currency, amount]) => ({
    currency,
    amount,
  }));
};

export default calculateTotalBalance;
