import { useEffect } from 'react';
import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { getDevices } from '../devicesSlice';

const useGetDevices = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useTypedSelector((state) => state.devices);

  const getAll = () => dispatch(getDevices());

  useEffect(() => {
    getAll();
  }, []);

  return {
    items,
    isLoading,
  };
};

export default useGetDevices;
