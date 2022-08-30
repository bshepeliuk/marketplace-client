import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { comparisonActions } from '../comparisonSlice';
import { TableCellTypes } from '../constants';
import { HeaderCellType } from '../types';
import useGetComparisonOptionsList from './useGetComparisonOptionsList';
import useGetDevicesForComparison from './useGetDevicesForComparison';

const useGetComparisonTableRows = () => {
  const dispatch = useAppDispatch();
  const { items } = useGetDevicesForComparison();
  const options = useGetComparisonOptionsList(items);
  const table = useTypedSelector((state) => state.comparison.table);
  // TODO: move to slice??? getTable action based on items in state.
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

  useEffect(() => {
    dispatch(comparisonActions.setTable({ header: headerList, body: bodyList }));
  }, [items]);

  return {
    headerList,
    bodyList,
    table,
    hasNoItemsForComparison: items.length === 0,
  };
};

export default useGetComparisonTableRows;
