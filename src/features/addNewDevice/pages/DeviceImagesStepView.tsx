import React from 'react';

import { newDeviceRoutes } from './NewDeviceView';
import {
  FormFooter,
  ImageFormWrap,
  PrevLink,
} from '../styles/deviceForm.styled';
import DeviceImagesPreview from '../components/ImageForm/DeviceImagesPreview';
import ImageFileInput from '../components/ImageForm/ImageFileInput';
import SaveBtn from '../components/SaveBtn';

function DeviceImagesStepView() {
  return (
    <ImageFormWrap>
      <ImageFileInput />
      <DeviceImagesPreview />

      <FormFooter>
        <PrevLink to={newDeviceRoutes.details}>Prev</PrevLink>
        <SaveBtn />
      </FormFooter>
    </ImageFormWrap>
  );
}

export default DeviceImagesStepView;
