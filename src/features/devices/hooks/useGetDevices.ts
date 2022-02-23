import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { getDevices } from '../devicesSlice';
import { devicesSelector } from '../selectors/deviceSelector';

const useGetDevices = () => {
  const dispatch = useAppDispatch();
  const categoryId = useGetCategoryId();
  const { items, isLoading } = useTypedSelector((state) => {
    return devicesSelector(state, categoryId);
  });

  const getAll = () => {
    dispatch(getDevices({ categoryId, offset: 0, limit: 20 }));
  };

  const hasNoDevices = items.length === 0;

  useEffect(() => {
    if (hasNoDevices) {
      getAll();
    }
  }, [categoryId]);

  return {
    items,
    isLoading,
  };
};

export default useGetDevices;
