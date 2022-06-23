import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { routes } from '@src/app/Router';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  grid-column-start: 4;

  &:hover {
    transform: rotate(360deg);
  }
`;

const Icon = styled(FaPlus)`
  color: #fff;
  transition: all 0.1s ease-out;

  &:hover {
    transform: rotate(90deg);
  }
`;

function AddDeviceIcon() {
  return (
    <Wrap>
      <Link to={routes.newDevice}>
        <Icon />
      </Link>
    </Wrap>
  );
}

export default AddDeviceIcon;
