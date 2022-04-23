import { IDeviceInfo } from '@src/features/devices/types';
import { ParamKeyValuePair } from 'react-router-dom';

type ISelectProps = Pick<IDeviceInfo, 'id' | 'title' | 'description'>;

function getFeaturesEntries(features: ISelectProps[]) {
  const serialized = serializeFeatures(features);

  return serialized.map((value) => ['features', value]) as ParamKeyValuePair[];
}

const serializeFeatures = (features: ISelectProps[]) => {
  return features.reduce((acc, current) => {
    const { title, description } = current;

    return [...acc, serialize({ title, description })];
  }, [] as string[]);
};

const serialize = <T>(value: T): string => {
  return Object.values(value).join(':');
};

export default getFeaturesEntries;
