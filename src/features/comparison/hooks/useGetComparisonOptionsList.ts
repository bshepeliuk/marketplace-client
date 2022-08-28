import { IDevice } from '@src/features/devices/types';
import fillOptionsListByDevices from '../helpers/fillOptionsListByDevices';
// eslint-disable-next-line max-len
import getPossibleOptionsListFromDevices from '../helpers/getPossibleOptionsListFromDevices';

const useGetComparisonOptionsList = (items: IDevice[]) => {
  const optionsList = getPossibleOptionsListFromDevices(items);
  const options = fillOptionsListByDevices({
    list: optionsList,
    devices: items,
  });

  return options;
};

export default useGetComparisonOptionsList;
