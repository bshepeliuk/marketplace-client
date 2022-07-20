import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { routes } from '@src/app/Router';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  grid-column-start: 4;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Icon = styled(FaPlus)`
  color: #fff;
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
