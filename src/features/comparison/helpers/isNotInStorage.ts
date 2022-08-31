import { IDevice } from '@src/features/devices/types';

const isNotInStorage = ({ data, id }: { data: IDevice[]; id: number }) => {
  return data.every((item) => item.id !== id);
};

export default isNotInStorage;
