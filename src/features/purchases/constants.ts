import createOption from '@src/common/utils/createSelectOption';

type SorterListType = Array<{ label: string; fieldName: 'fullName' | 'createdAt' }>;

export const PURCHASES_SORT_OPTIONS: SorterListType = [
  { label: 'created at', fieldName: 'createdAt' },
  { label: 'customer', fieldName: 'fullName' },
];

export const PURCHASES_SEARCH_OPTIONS = [
  { ...createOption('Order id'), fieldName: 'id' },
  { ...createOption('Device name'), fieldName: 'deviceName' },
];
