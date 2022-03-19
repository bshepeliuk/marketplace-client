import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import useClearLocationState from '@common/hooks/main/useClearLocationState';
import { getDevices } from '../devicesSlice';
import { devicesSelector } from '../selectors/deviceSelector';
import useCheckIfShouldRefetchDevices from './useCheckIfShouldRefetchDevices';

const useGetDevices = () => {
  const dispatch = useAppDispatch();
  const { shouldRefetchDevices } = useCheckIfShouldRefetchDevices();
  const clearLocationState = useClearLocationState();
  const categoryId = useGetCategoryId();

  const { items, isLoading } = useTypedSelector((state) => {
    return devicesSelector(state, categoryId);
  });

  const hasNoDevices = items.length === 0;

  const getAll = () => {
    dispatch(getDevices({ categoryId, offset: 0, limit: 20 }));
  };

  useEffect(() => {
    if (hasNoDevices || shouldRefetchDevices) {
      getAll();
      clearLocationState();
    }
  }, [categoryId]);

  return {
    items,
    isLoading,
  };
};

export default useGetDevices;
