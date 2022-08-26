import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { comparisonActions } from '../comparisonSlice';
import { COMPARISON_STORAGE_KEY } from '../constants';

const useDeleteFromComparison = () => {
  const dispatch = useAppDispatch();
  const { getItem, setItem } = useLocalStorage();

  const deleteById = (deviceId: number) => {
    const prevItems = getItem<IDevice>(COMPARISON_STORAGE_KEY);

    const nextItems = prevItems.filter((item) => item.id !== deviceId);

    setItem(COMPARISON_STORAGE_KEY, nextItems);

    dispatch(comparisonActions.deleteById({ deviceId }));
  };

  return {
    deleteById,
  };
};

export default useDeleteFromComparison;
