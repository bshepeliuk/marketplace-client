import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { getMoreDevices } from '../devicesSlice';

const useGetMoreDevices = () => {
  const dispatch = useAppDispatch();
  const { hasMore, isLoadingMore } = useTypedSelector((state) => state.devices);

  const fetchMore = () => dispatch(getMoreDevices());

  return {
    fetchMore,
    hasMore,
    isLoadingMore,
  };
};

export default useGetMoreDevices;
