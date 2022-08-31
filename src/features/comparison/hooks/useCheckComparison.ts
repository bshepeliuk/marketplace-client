import useLocalStorage from '@src/common/hooks/useLocalStorage';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { IDevice } from '@src/features/devices/types';
import { COMPARISON_STORAGE_KEY } from '../constants';
import isNotInStorage from '../helpers/isNotInStorage';

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

export default useCheckComparison;
