import { Nullable } from '@src/common/types/baseTypes';
import { IBrand } from '@src/features/brands/types';
import { ICategory } from '@src/features/categories/types';
import { newDeviceActionTypes } from './constants';
import {
  INewDeviceFeature,
  INewDeviceInfo,
  NewDeviceAction,
} from './newDeviceTypes';

export const newDeviceActions = {
  addBrand: ({ brand }: { brand: IBrand }) => ({
    type: newDeviceActionTypes.ADD_BRAND,
    payload: { brand },
  }),
  addCategory: ({ category }: { category: ICategory }) => ({
    type: newDeviceActionTypes.ADD_CATEGORY,
    payload: { category },
  }),
  addImage: ({ id, file }: { id: string; file: File }) => ({
    type: newDeviceActionTypes.ADD_IMAGES,
    payload: { image: { id, file } },
  }),
  deleteImageById: (id: string) => ({
    type: newDeviceActionTypes.DELETE_IMAGE,
    payload: { id },
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
  brand: null as Nullable<IBrand>,
  category: null as Nullable<ICategory>,
  info: null as Nullable<INewDeviceInfo>,
  images: [] as Array<{ id: string; file: File }>,
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
      const { image } = action.payload;
      return {
        ...state,
        images: state.images.concat(image),
      };
    }

    case newDeviceActionTypes.DELETE_IMAGE: {
      const items = state.images.filter((img) => img.id !== action.payload.id);

      return {
        ...state,
        images: items,
      };
    }

    default: {
      return state;
    }
  }
}

export default newDeviceReducer;
