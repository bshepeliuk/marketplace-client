/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useReducer } from 'react';
import newDeviceReducer, {
  newDeviceActions,
  newDeviceInitState,
  NewDeviceState,
} from '../modules/newDeviceModule';
import { INewDeviceFeature, INewDeviceInfo } from '../modules/newDeviceTypes';

interface IContext {
  save: () => void;
  deleteImg: () => void;
  addBrand: (name: string) => void;
  addCategory: (name: string) => void;
  addImage: (file: File) => void;
  addBaseInfo: (info: INewDeviceInfo) => void;
  addFeatureDetails: (feature: INewDeviceFeature) => void;
  deleteFeatureDetails: (feature: INewDeviceFeature) => void;
  formState: NewDeviceState;
}

export const NewDeviceContext = createContext<IContext | undefined>(undefined);

export function NewDeviceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(newDeviceReducer, newDeviceInitState);

  const addBrand = (name: string) => {
    dispatch(newDeviceActions.addBrand(name));
  };

  const addCategory = (name: string) => {
    dispatch(newDeviceActions.addCategory(name));
  };

  const addImage = (file: File) => {
    dispatch(newDeviceActions.addImage(file));
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

  const deleteImg = () => {
    // FIXME: add ID for each file.
    dispatch(newDeviceActions.deleteImageByUrl(''));
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
    deleteImg,
    formState: state,
  };

  return (
    <NewDeviceContext.Provider value={values}>
      {children}
    </NewDeviceContext.Provider>
  );
}
