import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { useEffect } from 'react';

const useAddToRecentlyViewed = (device: IDevice | undefined) => {
  const { getItem, setItem } = useLocalStorage();

  const STORAGE_KEY = 'recentlyViewed';

  useEffect(() => {
    const prevDevices = getItem<IDevice>(STORAGE_KEY);

    const hasAlreadyViewed = prevDevices.some((item) => item.id === device?.id);

    if (device === undefined || hasAlreadyViewed) return;

    if (prevDevices.length > 0) {
      setItem(STORAGE_KEY, [...prevDevices, device]);
    } else {
      setItem(STORAGE_KEY, [device]);
    }
  }, [device]);
};

export default useAddToRecentlyViewed;
