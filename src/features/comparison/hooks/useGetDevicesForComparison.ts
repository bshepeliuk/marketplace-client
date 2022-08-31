import { useEffect } from 'react';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { comparisonActions } from '../comparisonSlice';
import { COMPARISON_STORAGE_KEY } from '../constants';

const useGetDevicesForComparison = () => {
  const dispatch = useAppDispatch();
  const { getItem } = useLocalStorage();
  const items = useTypedSelector((state) => state.comparison.items);

  useEffect(() => {
    const prevItems = getItem<IDevice>(COMPARISON_STORAGE_KEY);

    const hasPrevItems = prevItems?.length > 0;

    if (hasPrevItems) {
      dispatch(comparisonActions.populate({ items: prevItems }));
    }
  }, []);

  return {
    items,
  };
};

export default useGetDevicesForComparison;
