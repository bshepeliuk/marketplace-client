import { useAppDispatch } from '@src/common/hooks/main/useAppDispatch';
import { useTypedSelector } from '@src/common/hooks/main/useTypedSelector';
import { useLocation } from 'react-router-dom';
import { getMoreDevices } from '../devicesSlice';

interface ILocationState {
  categoryId: number;
}

const useGetMoreDevices = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { hasMore, isLoadingMore } = useTypedSelector((state) => state.devices);

  const locationState = location.state as ILocationState;

  const fetchMore = () => {
    dispatch(getMoreDevices({ categoryId: locationState?.categoryId }));
  };

  return {
    fetchMore,
    hasMore,
    isLoadingMore,
  };
};

export default useGetMoreDevices;
