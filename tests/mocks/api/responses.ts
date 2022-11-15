import createOption from '@src/common/utils/createSelectOption';

export const ordersGetResponse = { orders: [], total: 0 };
export const purchasesGetResponse = { purchases: [], total: 0 };
export const ordersYearOptionsResponse = { options: [createOption(2022)] };
export const statsGetResponse = {
  stats: { devices: [], statuses: [], categories: [], customers: [], cities: [], orderMonth: [], orderTime: [] },
};
