import { IDevice, IDeviceInfo } from '@src/features/devices/types';

const useGetComparisonOptions = (items: IDevice[]) => {
  // TODO: refactoring
  const getAllPossibleOptions = (devices: IDevice[]) => {
    const options = new Map<string, string[]>([]);

    for (const device of devices) {
      const features = device.info as IDeviceInfo[];

      for (const option of features) {
        const key = option.title.toLocaleLowerCase();
        options.set(key, []);
      }
    }

    return Array.from(options);
  };

  const possibleOptions = getAllPossibleOptions(items);
  // TODO: refactoring
  const populateOptions = (options: Array<[string, string[]]>) => {
    const map = new Map<string, string[]>(options);

    for (const option of map) {
      const [key] = option;

      for (const device of items) {
        const feature = (device.info as IDeviceInfo[]).find(
          (item) => item.title.toLowerCase() === option[0].toLowerCase(),
        );

        const prevItems = map.get(key) ?? [];

        if (feature === undefined) {
          map.set(key, [...prevItems, '—']);
        } else {
          map.set(key, [...prevItems, feature.description]);
        }
      }
    }

    return Array.from(map);
  };

  const options = populateOptions(possibleOptions);

  return Array.from(options);
};

export default useGetComparisonOptions;
