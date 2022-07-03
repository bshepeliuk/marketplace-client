import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import LoaderView from '@src/common/components/Loader/Loader';
import { routes } from '@src/app/Router';
import useNewDeviceContext from '../hooks/useNewDeviceContext';
import { SaveButton } from '../styles/deviceForm.styled';

function SaveBtn() {
  const context = useNewDeviceContext();
  const navigate = useNavigate();

  const isDisabled = !context.hasValidAllSteps || context.isCreating;

  const onSave = async () => {
    const deviceId = await context.save();

    navigate(generatePath(routes.device, { deviceId: String(deviceId) }));
  };

  const content = context.isCreating ? (
    <LoaderView size={20} color="#c8d6e5" strokeWidth={1} />
  ) : (
    'Save'
  );

  return (
    <SaveButton type="button" onClick={onSave} disabled={isDisabled}>
      {content}
    </SaveButton>
  );
}

export default SaveBtn;
