/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
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
  formState: NewDeviceState;
}

export const NewDeviceContext = createContext<IContext | undefined>(undefined);

export function NewDeviceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(newDeviceReducer, newDeviceInitState);

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

  const deleteFeatureDetails = (feature: INewDeviceFeature) => {
    dispatch(newDeviceActions.deleteDeviceFeature(feature));
  };

  const deleteImgById = (id: string) => {
    // FIXME: add ID for each file.
    dispatch(newDeviceActions.deleteImageById(id));
  };

  const save = () => {};

  const values = {
    save,
    addImage,
    addFeatureDetails,
    addBrand,
    addCategory,
    addBaseInfo,
    deleteFeatureDetails,
    deleteImgById,
    formState: state,
  };

  return (
    <NewDeviceContext.Provider value={values}>
      {children}
    </NewDeviceContext.Provider>
  );
}
