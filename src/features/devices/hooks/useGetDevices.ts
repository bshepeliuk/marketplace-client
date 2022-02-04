import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { getDevices } from '../devicesSlice';
import { devicesSelector } from '../selectors/deviceSelector';

const useGetDevices = () => {
  const dispatch = useAppDispatch();
  const { items } = useTypedSelector(devicesSelector);

  const getAll = () => dispatch(getDevices());

  useEffect(() => {
    if (items.length === 0) {
      getAll();
    }
  }, []);

  return {
    items,
    isLoading: false,
  };
};

export default useGetDevices;
