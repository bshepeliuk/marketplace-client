import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { RECENTLY_VIEWED_STORAGE_KEY } from '../constants';
import { IViewedDevice } from '../types';

const useGetRecentlyViewed = () => {
  const { getItem } = useLocalStorage();

  return getItem<IViewedDevice>(RECENTLY_VIEWED_STORAGE_KEY);
};

export default useGetRecentlyViewed;
