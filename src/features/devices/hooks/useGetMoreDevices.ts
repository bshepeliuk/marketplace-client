import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useGetCategoryId from '@features/categories/hooks/useGetCategoryId';
import { getMoreDevices } from '../devicesSlice';

const useGetMoreDevices = () => {
  const categoryId = useGetCategoryId();
  const dispatch = useAppDispatch();
  const { hasMore, isLoadingMore } = useTypedSelector((state) => state.devices);

  const fetchMore = () => {
    // FIXME: handle query params string;
    dispatch(getMoreDevices({ categoryId }));
  };

  return {
    fetchMore,
    hasMore,
    isLoadingMore,
  };
};

export default useGetMoreDevices;
