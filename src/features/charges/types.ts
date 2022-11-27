export interface IChargeItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
}

export type ICharges = IChargeItem[];
