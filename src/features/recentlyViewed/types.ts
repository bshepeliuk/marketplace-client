import { IDevice } from '../devices/types';

export interface IViewedDevice extends IDevice {
  viewedAt: Date;
}
