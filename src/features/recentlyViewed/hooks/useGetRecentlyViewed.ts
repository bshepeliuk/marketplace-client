import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';

const useGetRecentlyViewed = () => {
  const { getItem } = useLocalStorage();

  const STORAGE_KEY = 'recentlyViewed';

  return getItem<IDevice>(STORAGE_KEY);
};

export default useGetRecentlyViewed;
