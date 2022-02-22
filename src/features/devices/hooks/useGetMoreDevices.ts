import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { getMoreDevices } from '../devicesSlice';

const useGetMoreDevices = () => {
  const categoryId = useGetCategoryId();
  const dispatch = useAppDispatch();
  const { hasMore, isLoadingMore } = useTypedSelector((state) => state.devices);

  const fetchMore = () => {
    dispatch(getMoreDevices({ categoryId }));
  };

  return {
    fetchMore,
    hasMore,
    isLoadingMore,
  };
};

export default useGetMoreDevices;
