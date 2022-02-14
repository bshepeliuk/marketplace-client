import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { getDevices } from '../devicesSlice';
import { devicesSelector } from '../selectors/deviceSelector';

const useGetDevices = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector(devicesSelector);

  const getAll = () => dispatch(getDevices({ offset: 0, limit: 20 }));

  useEffect(() => {
    if (items.length === 0) {
      getAll();
    }
  }, []);

  return {
    items,
    isLoading,
  };
};

export default useGetDevices;
