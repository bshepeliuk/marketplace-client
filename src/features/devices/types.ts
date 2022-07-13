import { IFilterOptions } from '@src/common/types/apiTypes';
import { CSSProperties } from 'styled-components';

export interface IDeviceImage {
  id: number;
  url: string;
  deviceId: number;
}

export interface IDeviceInfo {
  id: number;
  title: string;
  description: string;
  typeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDeviceRating {
  id: number;
  deviceId: number;
  userId: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDevice {
  id: number;
  name: string;
  price: number;
  brandId: number;
  userId: number;
  typeId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  images: IDeviceImage[] | number[];
  info: IDeviceInfo[] | number[];
  ratings: IDeviceRating[] | number[];
}

export interface IDeviceData {
  device: IDevice;
}

export interface IDeviceWithCount extends IDevice {
  count: number;
}

export type DeviceEntities = {
  devices: Record<string, IDevice>;
  images: Record<string, IDeviceImage>;
  info: Record<string, IDeviceInfo>;
  ratings: Record<string, IDeviceRating>;
};

export interface IDeviceRatingEntity {
  result: number;
  entities: Extract<DeviceEntities, 'ratings'>;
}

export interface IDevicesData {
  result: number[];
  entities: DeviceEntities;
}

export interface IDeviceEntityData {
  result: number;
  entities: DeviceEntities;
}

export interface IEvaluateDeviceEntity {
  result: number;
  entities: Pick<DeviceEntities, 'devices' | 'ratings'>;
}

interface IListData {
  items: IDevice[];
  isLoading: boolean;
  isLoadingMore: boolean;
  COLUMN_COUNT: number;
}

export interface IGetMoreDevicesParams {
  filters: IFilterOptions;
}

export interface IListItemProps {
  rowIndex: number;
  columnIndex: number;
  data: IListData;
  style: CSSProperties;
}

export interface IOnItemsRenderedParams {
  visibleRowStartIndex: number;
  visibleRowStopIndex: number;
  overscanRowStopIndex: number;
  overscanRowStartIndex: number;
  overscanColumnStopIndex: number;
  overscanColumnStartIndex: number;
  visibleColumnStartIndex: number;
  visibleColumnStopIndex: number;
}
