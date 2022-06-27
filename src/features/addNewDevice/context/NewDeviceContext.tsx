/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import { Devices } from '@src/common/api/Api';
import { IBrand } from '@src/features/brands/types';
import { ICategory } from '@src/features/categories/types';
import React, { createContext, useReducer } from 'react';
import newDeviceReducer, {
  newDeviceActions,
  newDeviceInitState,
  NewDeviceState,
} from '../modules/newDeviceModule';
import { INewDeviceFeature, INewDeviceInfo } from '../modules/newDeviceTypes';

interface IContext {
  save: () => void;
  deleteImgById: (id: string) => void;
  addBrand: ({ brand }: { brand: IBrand }) => void;
  addCategory: ({ category }: { category: ICategory }) => void;
  addImage: (file: File) => void;
  addBaseInfo: (info: INewDeviceInfo) => void;
  addFeatureDetails: (feature: INewDeviceFeature) => void;
  deleteFeatureDetails: (feature: INewDeviceFeature) => void;
  clearBrand: () => void;
  clearCategory: () => void;
  clearBaseInfo: () => void;
  checkIfNewFeatureUniqueByTitle: (title: string) => boolean;
  hasValidAllSteps: boolean;
  formState: NewDeviceState;
}

export const NewDeviceContext = createContext<IContext | undefined>(undefined);

export function NewDeviceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(newDeviceReducer, newDeviceInitState);

  const hasValidAllSteps =
    state.brand !== null &&
    state.category !== null &&
    state.info !== null &&
    state.features.length > 0 &&
    state.images.length > 0;

  const addBrand = ({ brand }: { brand: IBrand }) => {
    dispatch(newDeviceActions.addBrand({ brand }));
  };

  const addCategory = ({ category }: { category: ICategory }) => {
    dispatch(newDeviceActions.addCategory({ category }));
  };

  const addImage = (file: File) => {
    dispatch(newDeviceActions.addImage({ id: file.name, file }));
  };

  const addBaseInfo = (info: INewDeviceInfo) => {
    dispatch(newDeviceActions.addBaseInfo(info));
  };

  const addFeatureDetails = (feature: INewDeviceFeature) => {
    dispatch(newDeviceActions.addFeatureDetails(feature));
  };

  const checkIfNewFeatureUniqueByTitle = (title: string) => {
    return !state.features.some(
      (i) => i.title.toLowerCase() === title.toLowerCase(),
    );
  };

  const deleteFeatureDetails = (feature: INewDeviceFeature) => {
    dispatch(newDeviceActions.deleteDeviceFeature(feature));
  };

  const deleteImgById = (id: string) => {
    dispatch(newDeviceActions.deleteImageById(id));
  };

  const clearBrand = () => {
    dispatch(newDeviceActions.removeBrand());
  };

  const clearCategory = () => {
    dispatch(newDeviceActions.removeCategory());
  };

  const clearBaseInfo = () => {
    dispatch(newDeviceActions.removeBaseInfo());
  };

  const save = async () => {
    if (!hasValidAllSteps) return;
    // TODO: move to thunk;
    Devices.create({
      brandId: state.brand!.id,
      categoryId: state.category!.id,
      info: state.info!,
      features: state.features,
      images: state.images.map((i) => i.file),
    });
  };

  const values = {
    save,
    addImage,
    addFeatureDetails,
    addBrand,
    addCategory,
    addBaseInfo,
    deleteFeatureDetails,
    deleteImgById,
    clearBrand,
    clearCategory,
    clearBaseInfo,
    hasValidAllSteps,
    checkIfNewFeatureUniqueByTitle,
    formState: state,
  };

  return (
    <NewDeviceContext.Provider value={values}>
      {children}
    </NewDeviceContext.Provider>
  );
}
