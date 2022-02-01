export interface IDevice {
  id: number;
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDevicesData {
  devices: IDevice[];
}
