export interface IBalanceItem {
  amount: number;
  currency: string;
}

export interface IBalance {
  available: IBalanceItem[];
  instant_available: IBalanceItem[];
  pending: IBalanceItem[];
}
