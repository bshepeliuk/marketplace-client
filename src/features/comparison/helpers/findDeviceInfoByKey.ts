import { IDeviceInfo } from '@src/features/devices/types';

interface IProps {
  infoList: IDeviceInfo[];
  key: string;
}

const findDeviceInfoByKey = ({ infoList, key }: IProps) => {
  return infoList.find(
    (item) => item.title.toLowerCase() === key.toLowerCase(),
  );
};

export default findDeviceInfoByKey;
