import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@src/common/hooks/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { getMoreDevices } from '../devicesSlice';

const useGetMoreDevices = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const { hasMore, isLoadingMore } = useTypedSelector((state) => state.devices);

  const fetchMore = () => {
    const filters = Array.from(params.entries());

    dispatch(getMoreDevices({ filters }));
  };

  return {
    fetchMore,
    hasMore,
    isLoadingMore,
  };
};

export default useGetMoreDevices;
