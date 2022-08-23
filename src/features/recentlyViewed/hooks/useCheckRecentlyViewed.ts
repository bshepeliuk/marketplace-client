import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { RECENTLY_VIEWED_STORAGE_KEY } from '../constants';

const useCheckRecentlyViewed = () => {
  const { getItem } = useLocalStorage();

  const hasAnyViewedItems = () => {
    const items = getItem(RECENTLY_VIEWED_STORAGE_KEY);

    return items.length > 0;
  };

  return {
    hasAnyViewedItems,
  };
};

export default useCheckRecentlyViewed;
