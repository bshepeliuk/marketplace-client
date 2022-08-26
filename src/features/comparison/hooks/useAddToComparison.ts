import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { comparisonActions } from '../comparisonSlice';
import { COMPARISON_STORAGE_KEY } from '../constants';
import useCheckComparison from './useCheckComparison';

const useAddToComparison = () => {
  const dispatch = useAppDispatch();
  const { setItem, getItem } = useLocalStorage();
  const { isUnique } = useCheckComparison();

  const addToComparison = (device: IDevice) => {
    const prevItems = getItem<IDevice>(COMPARISON_STORAGE_KEY);

    if (isUnique(device)) {
      setItem(COMPARISON_STORAGE_KEY, [...prevItems, device]);
      dispatch(comparisonActions.add({ device }));
    }
  };

  return {
    addToComparison,
  };
};

export default useAddToComparison;
