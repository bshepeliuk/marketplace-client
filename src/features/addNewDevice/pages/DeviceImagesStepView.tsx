import React from 'react';

import useNewDeviceContext from '../hooks/useNewDeviceContext';
import { newDeviceRoutes } from './NewDeviceView';
import {
  FormFooter,
  ImageFormWrap,
  PrevLink,
  SaveButton,
} from '../styles/deviceForm.styled';
import DeviceImagesPreview from '../components/ImageForm/DeviceImagesPreview';
import ImageFileInput from '../components/ImageForm/ImageFileInput';

function DeviceImagesStepView() {
  const context = useNewDeviceContext();

  const isDisabled = !context.hasValidAllSteps;

  return (
    <ImageFormWrap>
      <ImageFileInput />
      <DeviceImagesPreview />

      <FormFooter>
        <PrevLink to={newDeviceRoutes.details}>Prev</PrevLink>
        <SaveButton type="button" onClick={context.save} disabled={isDisabled}>
          Save
        </SaveButton>
      </FormFooter>
    </ImageFormWrap>
  );
}

export default DeviceImagesStepView;
