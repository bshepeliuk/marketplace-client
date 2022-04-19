import { IDeviceInfo } from '@src/features/devices/types';

type ISelectProps = Pick<IDeviceInfo, 'id' | 'title' | 'description'>;

const serializeSelectedFeatures = (features: ISelectProps[]) => {
  return features.reduce((acc, current) => {
    const { title, description } = current;

    return [...acc, serialize({ title, description })];
  }, [] as string[]);
};

const serialize = <T>(value: T): string => {
  return Object.values(value).join(':');
};

export default serializeSelectedFeatures;
