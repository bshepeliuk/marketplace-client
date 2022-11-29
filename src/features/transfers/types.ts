export interface ITransferItem {
  amount: number;
  status: string;
  created: number;
  currency: string;
  id: string;
  arrival_date: number;
  automatic: boolean;
  type: string;
}
export type ITransfers = ITransferItem[];
