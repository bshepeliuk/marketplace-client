import { IBrand } from '@src/features/brands/types';
import { ICategory } from '@src/features/categories/types';
import { newDeviceActionTypes } from './constants';

export interface INewBrand {
  name: string;
}

export interface INewCategory {
  name: string;
}

export interface INewDeviceInfo {
  price: string;
  quantity: string;
  name: string;
}

export interface INewDeviceFeature {
  title: string;
  description: string;
}

export interface INewDeviceImage {
  url: string;
}

export type NewDeviceAction =
  | {
      type: typeof newDeviceActionTypes.ADD_BRAND;
      payload: {
        brand: IBrand;
      };
    }
  | {
      type: typeof newDeviceActionTypes.ADD_CATEGORY;
      payload: {
        category: ICategory;
      };
    }
  | {
      type: typeof newDeviceActionTypes.ADD_IMAGES;
      payload: {
        image: { id: string; file: File };
      };
    }
  | {
      type: typeof newDeviceActionTypes.ADD_BASE_INFO;
      payload: {
        info: INewDeviceInfo;
      };
    }
  | {
      type: typeof newDeviceActionTypes.ADD_FEATURE_DETAILS;
      payload: {
        feature: INewDeviceFeature;
      };
    }
  | {
      type: typeof newDeviceActionTypes.DELETE_FEATURE_DETAILS;
      payload: {
        feature: INewDeviceFeature;
      };
    }
  | {
      type: typeof newDeviceActionTypes.DELETE_IMAGE;
      payload: {
        id: string;
      };
    };
