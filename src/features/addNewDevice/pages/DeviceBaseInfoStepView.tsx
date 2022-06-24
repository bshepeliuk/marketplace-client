import React from 'react';
import { FormWrap } from '../styles/deviceForm.styled';
import BaseInfoFormView from '../components/BaseInfoForm/BaseInfoFormView';

function DeviceBaseInfoStepView() {
  return (
    <FormWrap>
      <BaseInfoFormView />
    </FormWrap>
  );
}

export default DeviceBaseInfoStepView;
