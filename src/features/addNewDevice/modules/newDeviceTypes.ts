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
        brand: INewBrand;
      };
    }
  | {
      type: typeof newDeviceActionTypes.ADD_CATEGORY;
      payload: {
        category: INewCategory;
      };
    }
  | {
      type: typeof newDeviceActionTypes.ADD_IMAGES;
      payload: {
        file: File;
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
        url: string;
      };
    };
