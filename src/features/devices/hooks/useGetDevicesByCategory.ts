import { useAppDispatch } from '@common/hooks/main/useAppDispatch';
import { getDevices } from '../devicesSlice';

const useGetDevicesByCategory = () => {
  const dispatch = useAppDispatch();

  const getByCategory = (categoryId: number) => {
    dispatch(getDevices({ categoryId, offset: 0, limit: 20 }));
  };

  return {
    getByCategory,
  };
};

export default useGetDevicesByCategory;
