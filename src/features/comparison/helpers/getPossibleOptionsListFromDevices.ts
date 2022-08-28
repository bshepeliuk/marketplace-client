import { IDevice, IDeviceInfo } from '@src/features/devices/types';

export const getPossibleOptionsListFromDevices = (devices: IDevice[]) => {
  const options = new Map<string, string[]>([]);

  for (const device of devices) {
    const infoList = device.info as IDeviceInfo[];

    for (const option of infoList) {
      options.set(option.title.toLocaleLowerCase(), []);
    }
  }

  return Array.from(options);
};

export default getPossibleOptionsListFromDevices;
