import React from 'react';
import { routes } from '@src/app/Router';
import { Link } from 'react-router-dom';
import { Icon, Wrap } from './addDeviceLink.styled';

function AddDeviceLink() {
  return (
    <Wrap>
      <Link to={routes.newDevice}>
        <Icon />
      </Link>
    </Wrap>
  );
}

export default AddDeviceLink;
