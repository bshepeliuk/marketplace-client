import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import useGetCategoryId from '@src/features/categories/hooks/useGetCategoryId';
import { useNavigate } from 'react-router-dom';
import { getDevices } from '../devicesSlice';

const useGetDevicesByRequest = () => {
  const categoryId = useGetCategoryId();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const getAll = () => {
    if (categoryId === undefined) return;

    dispatch(getDevices({ offset: 0, limit: 20 }));

    navigate({
      pathname: '/',
      search: undefined,
    });
  };

  return {
    getAll,
  };
};

export default useGetDevicesByRequest;
