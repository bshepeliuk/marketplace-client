import React from 'react';
import { FormWrap } from '../styles/deviceForm.styled';
import DeviceFeatureFormView from '../components/DeviceFeatureForm/DeviceFeatureFormView';
import DeviceFeatureList from '../components/DeviceFeatureList';

function DeviceFeatureStepView() {
  return (
    <FormWrap>
      <DeviceFeatureFormView />
      <DeviceFeatureList />
    </FormWrap>
  );
}

export default DeviceFeatureStepView;
