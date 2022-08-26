import { IDevice, IDeviceInfo } from '@src/features/devices/types';

const useGetComparisonOptions = (items: IDevice[]) => {
  const options = new Map<string, string[]>([]);

  for (const item of items) {
    for (const info of item.info as IDeviceInfo[]) {
      const key = info.title.toLocaleLowerCase();
      options.set(key, (options.get(key) || []).concat(info.description));
    }
  }

  return Array.from(options);
};

export default useGetComparisonOptions;
