import React from 'react';
import { routes } from '@src/app/Router';
import { CustomLink, Icon, Wrap } from './addDeviceLink.styled';

function AddDeviceLink() {
  return (
    <Wrap>
      <CustomLink to={routes.newDevice}>
        <Icon />
      </CustomLink>
    </Wrap>
  );
}

export default AddDeviceLink;
