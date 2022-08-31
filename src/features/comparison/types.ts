import { IDevice } from '../devices/types';
import { TableCellTypes } from './constants';

export interface IHeaderDevice extends IDevice {
  type: typeof TableCellTypes.Header;
}

export interface IHeaderInfo {
  type: typeof TableCellTypes.HeaderInfo;
  value: string;
}

export type HeaderCellType = IHeaderDevice | IHeaderInfo;

export interface IBodyFeatureKey {
  type: typeof TableCellTypes.FeatureKey;
  value: string;
}

export interface IBodyFeatureValue {
  type: typeof TableCellTypes.FeatureValue;
  value: string;
}

export type BodyCellType = IBodyFeatureKey | IBodyFeatureValue;
