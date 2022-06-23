import { Nullable } from '@src/common/types/baseTypes';
import { newDeviceActionTypes } from './constants';
import {
  INewBrand,
  INewCategory,
  INewDeviceFeature,
  INewDeviceInfo,
  NewDeviceAction,
} from './newDeviceTypes';

export const newDeviceActions = {
  addBrand: (name: string) => ({
    type: newDeviceActionTypes.ADD_BRAND,
    payload: { brand: { name } },
  }),
  addCategory: (name: string) => ({
    type: newDeviceActionTypes.ADD_CATEGORY,
    payload: { category: { name } },
  }),
  addImage: (file: File) => ({
    type: newDeviceActionTypes.ADD_IMAGES,
    payload: { file },
  }),
  deleteImageByUrl: (url: string) => ({
    type: newDeviceActionTypes.DELETE_IMAGE,
    payload: { url },
  }),
  addBaseInfo: (info: INewDeviceInfo) => ({
    type: newDeviceActionTypes.ADD_BASE_INFO,
    payload: { info },
  }),
  addFeatureDetails: (feature: INewDeviceFeature) => ({
    type: newDeviceActionTypes.ADD_FEATURE_DETAILS,
    payload: { feature },
  }),
  deleteDeviceFeature: (feature: INewDeviceFeature) => ({
    type: newDeviceActionTypes.DELETE_FEATURE_DETAILS,
    payload: { feature },
  }),
};

export const newDeviceInitState = {
  brand: null as Nullable<INewBrand>,
  category: null as Nullable<INewCategory>,
  info: null as Nullable<INewDeviceInfo>,
  images: [] as Array<File>,
  features: [] as Array<INewDeviceFeature>,
};

export type NewDeviceState = typeof newDeviceInitState;

function newDeviceReducer(
  state: NewDeviceState,
  action: NewDeviceAction,
): NewDeviceState {
  switch (action.type) {
    case newDeviceActionTypes.ADD_BRAND: {
      return {
        ...state,
        brand: action.payload.brand,
      };
    }

    case newDeviceActionTypes.ADD_CATEGORY: {
      return {
        ...state,
        category: action.payload.category,
      };
    }

    case newDeviceActionTypes.ADD_BASE_INFO: {
      return {
        ...state,
        info: action.payload.info,
      };
    }

    case newDeviceActionTypes.ADD_FEATURE_DETAILS: {
      return {
        ...state,
        features: state.features.concat(action.payload.feature),
      };
    }

    case newDeviceActionTypes.DELETE_FEATURE_DETAILS: {
      const { title, description } = action.payload.feature;

      return {
        ...state,
        features: state.features.filter((item) => {
          return (
            // prettier-ignore
            item.title.toLocaleLowerCase() !== title.toLocaleLowerCase() &&
            item.description.toLocaleLowerCase() !== description.toLocaleLowerCase()
          );
        }),
      };
    }

    case newDeviceActionTypes.ADD_IMAGES: {
      return {
        ...state,
        images: state.images.concat(action.payload.file),
      };
    }

    case newDeviceActionTypes.DELETE_IMAGE: {
      return {
        ...state,
        images: [],
      };
    }

    default: {
      return state;
    }
  }
}

export default newDeviceReducer;
