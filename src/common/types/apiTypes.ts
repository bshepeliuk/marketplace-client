import { INewDeviceFeature, INewDeviceInfo } from '@src/features/addNewDevice/modules/newDeviceTypes';
import { ParamKeyValuePair } from 'react-router-dom';
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

export interface ICreateDeviceParams {
  images: File[];
  brandId: number;
  categoryId: number;
  info: INewDeviceInfo;
  features: INewDeviceFeature[];
}

export interface IEvaluateDeviceParams {
  rating: number;
  deviceId: number;
}

export interface IAddCommentParams {
  body: string;
  deviceId: number;
  parentId: number | null;
}

export interface IUpdateCommentParams {
  body: string;
  commentId: number;
}

export interface IGetRepliesParams {
  commentId: number;
  limit?: number;
  offset?: number;
}

export interface IGetCommentsParams {
  deviceId: number;
  limit?: number;
  offset?: number;
}

export interface IGetOrdersParams {
  offset: number;
  limit: number;
  filters?: ParamKeyValuePair[];
}

export interface IGetStatsParams {
  offset?: number;
  limit?: number;
  filters?: ParamKeyValuePair[];
}

export interface IGetChargesParams {
  endingBefore?: string;
  startingAfter?: string;
  limit?: number;
}
