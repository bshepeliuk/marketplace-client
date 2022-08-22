import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { convertDayToMs } from '@src/common/utils/convertDayToMs';
import { RECENTLY_VIEWED_STORAGE_KEY } from '../constants';
import { IViewedDevice } from '../types';

interface IProps {
  ttlInMs: number;
}

const DEFAULT_TTL = convertDayToMs(1);

const useDeleteViewedOnTTLExpired = ({ ttlInMs = DEFAULT_TTL }: IProps) => {
  const { getItem, setItem } = useLocalStorage();

  const prevViewedDevices = getItem<IViewedDevice>(RECENTLY_VIEWED_STORAGE_KEY);

  const nextViewedDevices = prevViewedDevices.filter((item) => {
    return Date.now() - new Date(item.viewedAt).getTime() < ttlInMs;
  });

  setItem(RECENTLY_VIEWED_STORAGE_KEY, nextViewedDevices);
};

export default useDeleteViewedOnTTLExpired;
