import { CSSProperties } from 'styled-components';

export interface IDeviceImage {
  id: number;
  url: string;
  deviceId: number;
}

export interface IDevice {
  id: number;
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  quantity: number;
  images: IDeviceImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IDeviceData {
  device: IDevice;
}

export interface IDevicesData {
  devices: IDevice[];
  result: number[];
}

interface IListData {
  items: IDevice[];
  isLoading: boolean;
  isLoadingMore: boolean;
  COLUMN_COUNT: number;
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
