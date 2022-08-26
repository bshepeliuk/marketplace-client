import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IDevice } from '@src/features/devices/types';
import { COMPARISON_STORAGE_KEY } from '../constants';

const useCheckComparison = () => {
  const { items } = useTypedSelector((state) => state.comparison);
  const { getItem } = useLocalStorage();

  const isUnique = (device: IDevice) => {
    const itemsInStorage = getItem<IDevice>(COMPARISON_STORAGE_KEY);

    const hasNoInStorage = isNotInStorage({
      data: itemsInStorage,
      id: device.id,
    });

    const hasNoInState = isNotInStorage({ data: items, id: device.id });

    return hasNoInStorage && hasNoInState;
  };

  return {
    isUnique,
  };
};

const isNotInStorage = ({ data, id }: { data: IDevice[]; id: number }) => {
  return data.every((item) => item.id !== id);
};

export default useCheckComparison;
