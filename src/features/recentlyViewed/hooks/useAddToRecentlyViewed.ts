import { useEffect } from 'react';
import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { IDevice } from '@src/features/devices/types';
import { RECENTLY_VIEWED_STORAGE_KEY } from '../constants';

interface IProps {
  device: IDevice | undefined;
  viewedAt: Date;
}

const useAddToRecentlyViewed = ({ device, viewedAt }: IProps) => {
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const prevDevices = getItem<IDevice>(RECENTLY_VIEWED_STORAGE_KEY);

    const hasAlreadyViewed = prevDevices.some((item) => item.id === device?.id);

    if (device === undefined || hasAlreadyViewed) return;

    setItem(RECENTLY_VIEWED_STORAGE_KEY, [
      ...prevDevices,
      { ...device, viewedAt },
    ]);
  }, [device]);
};

export default useAddToRecentlyViewed;
