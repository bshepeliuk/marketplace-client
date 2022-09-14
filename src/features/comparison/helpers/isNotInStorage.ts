import { IDevice } from '@src/features/devices/types';

interface IProps {
  data: IDevice[];
  id: number;
}

const isNotInStorage = ({ data, id }: IProps) => {
  return data.every((item) => item.id !== id);
};

export default isNotInStorage;
