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

export interface IDevicesData {
  devices: IDevice[];
}

export interface IListItemProps {
  rowIndex: number;
  columnIndex: number;
  data: IDevice[];
  style: CSSProperties;
}
