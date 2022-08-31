import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { useEffect } from 'react';
import { comparisonActions } from '../comparisonSlice';

const useGetComparisonTable = () => {
  const dispatch = useAppDispatch();

  const { table, items } = useTypedSelector((state) => state.comparison);

  const hasNoItemsForComparison = items.length === 0;

  useEffect(() => {
    dispatch(comparisonActions.getComparisonTable());
  }, [items]);

  return {
    table,
    hasNoItemsForComparison,
  };
};

export default useGetComparisonTable;
