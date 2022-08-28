import { TableCellTypes } from '../constants';
import { HeaderCellType } from '../types';
import useGetComparisonOptionsList from './useGetComparisonOptionsList';
import useGetDevicesForComparison from './useGetDevicesForComparison';

const useGetComparisonTableRows = () => {
  const { items } = useGetDevicesForComparison();
  const options = useGetComparisonOptionsList(items);

  const bodyList = options.map(([key, values]) => [
    { type: TableCellTypes.FeatureKey, value: key },
    ...values.map((value) => ({ type: TableCellTypes.FeatureValue, value })),
  ]);

  const devices = items.map((device) => ({
    type: TableCellTypes.Header,
    ...device,
  }));

  const headerList: Array<HeaderCellType> = [
    {
      type: TableCellTypes.HeaderInfo,
      value: `${items.length} devices have been added for comparison.`,
    },
    ...devices,
  ];

  return {
    headerList,
    bodyList,
    hasNoItemsForComparison: items.length === 0,
  };
};

export default useGetComparisonTableRows;
