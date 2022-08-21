import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { useEffect } from 'react';
import { RECENTLY_VIEWED_STORAGE_KEY } from '../constants';

const useAddToRecentlyViewed = (device: IDevice | undefined) => {
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const prevDevices = getItem<IDevice>(RECENTLY_VIEWED_STORAGE_KEY);

    const hasAlreadyViewed = prevDevices.some((item) => item.id === device?.id);

    if (device === undefined || hasAlreadyViewed) return;

    if (prevDevices.length > 0) {
      setItem(RECENTLY_VIEWED_STORAGE_KEY, [...prevDevices, device]);
    } else {
      setItem(RECENTLY_VIEWED_STORAGE_KEY, [device]);
    }
  }, [device]);
};

export default useAddToRecentlyViewed;
