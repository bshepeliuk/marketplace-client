import React from 'react';

import useNewDeviceContext from '../hooks/useNewDeviceContext';
import { newDeviceRoutes } from './NewDeviceView';
import {
  FormFooter,
  FormWrap,
  PrevLink,
  SaveButton,
} from '../styles/deviceForm.styled';
import DeviceImagesPreview from '../components/ImageForm/DeviceImagesPreview';
import ImageFileInput from '../components/ImageForm/ImageFileInput';

function DeviceImagesStepView() {
  const context = useNewDeviceContext();

  return (
    <FormWrap>
      <ImageFileInput />

      <FormFooter>
        <PrevLink to={newDeviceRoutes.details}>Prev</PrevLink>
        <SaveButton type="button" onClick={context.save}>
          Save
        </SaveButton>
      </FormFooter>

      <DeviceImagesPreview />
    </FormWrap>
  );
}

export default DeviceImagesStepView;
