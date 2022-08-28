import { IDevice, IDeviceInfo } from '@src/features/devices/types';
import findDeviceInfoByKey from './findDeviceInfoByKey';

interface IProps {
  list: Array<[string, string[]]>;
  devices: IDevice[];
}

const fillOptionsListByDevices = ({ list, devices }: IProps) => {
  const options = new Map(list);

  for (const [key] of list) {
    for (const device of devices) {
      const infoList = device.info as IDeviceInfo[];

      const infoItem = findDeviceInfoByKey({ infoList, key });

      const prevItems = options.get(key) ?? [];

      const hasNoInfoItem = infoItem === undefined;

      if (hasNoInfoItem) {
        options.set(key, [...prevItems, '-']);
      } else {
        options.set(key, [...prevItems, infoItem.description]);
      }
    }
  }

  return Array.from(options);
};

export default fillOptionsListByDevices;
