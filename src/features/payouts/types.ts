export interface IPayoutItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
  arrival_date: number;
}

export type IPayouts = IPayoutItem[];
