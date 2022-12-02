import createOption from '@src/common/utils/createSelectOption';
import { balanceMock } from '../data';

export const ordersGetResponse = { orders: [], total: 0 };
export const purchasesGetResponse = { purchases: [], total: 0 };
export const ordersYearOptionsResponse = { options: [createOption(2022)] };
export const statsGetResponse = {
  stats: { devices: [], statuses: [], categories: [], customers: [], cities: [], orderMonth: [], orderTime: [] },
};

export const chargesGetResponse = {
  charges: {
    data: [],
    has_more: true,
  },
};

export const payoutsGetResponse = {
  payouts: {
    data: [],
    has_more: true,
  },
};

export const transfersGetResponse = {
  transfers: {
    data: [],
    has_more: true,
  },
};

export const balanceGetResponse = {
  balance: balanceMock,
};
