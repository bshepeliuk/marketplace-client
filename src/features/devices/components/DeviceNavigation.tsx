import React from 'react';
import { generatePath } from 'react-router-dom';
import { routes } from '@src/app/Router';
import { MenuLink, NavWrap } from '../styles/deviceDetails.styled';

interface IProps {
  deviceId: number;
}

function DeviceNavigation({ deviceId }: IProps) {
  return (
    <NavWrap>
      <MenuLink end to={generatePath(routes.device, { deviceId: String(deviceId) })}>
        Overview
      </MenuLink>

      <MenuLink
        to={generatePath(routes.deviceWithEntity, {
          deviceId: String(deviceId),
          entity: 'comments',
        })}
      >
        Rating & Comments
      </MenuLink>
    </NavWrap>
  );
}

export default DeviceNavigation;
