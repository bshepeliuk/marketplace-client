import { ROLES } from '../constants';

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  fullName: string;
  role: typeof ROLES.SELLER | typeof ROLES.BUYER;
}

export type IFilterOptions = Array<[string, string]>;

interface IDeviceDefaultParams {
  limit: number;
  offset: number;
  categoryId?: number;
}

export interface IGetDevicesProps extends IDeviceDefaultParams {
  filters?: IFilterOptions;
}

export interface IGetDevicesParams extends IDeviceDefaultParams {
  offset: number;
  limit: number;
  categoryId?: number;
  options?: string;
  prices?: string;
}
