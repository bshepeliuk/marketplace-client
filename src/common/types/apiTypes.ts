export enum ROLE {
  // eslint-disable-next-line no-unused-vars
  BUYER = 'BUYER',
  // eslint-disable-next-line no-unused-vars
  SELLER = 'SELLER',
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  fullName: string;
  role: ROLE.SELLER | ROLE.BUYER;
}

export interface IFilterOptions {
  features: string[];
  prices: number[];
}

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
