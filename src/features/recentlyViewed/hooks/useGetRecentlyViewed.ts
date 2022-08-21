import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { RECENTLY_VIEWED_STORAGE_KEY } from '../constants';

const useGetRecentlyViewed = () => {
  const { getItem } = useLocalStorage();

  return getItem<IDevice>(RECENTLY_VIEWED_STORAGE_KEY);
};

export default useGetRecentlyViewed;
