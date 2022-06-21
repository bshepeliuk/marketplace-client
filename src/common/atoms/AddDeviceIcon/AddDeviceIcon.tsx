import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { routes } from '@src/app/Router';
import { Link } from 'react-router-dom';

const Wrap = styled.div`
  grid-column-start: 4;
`;

function AddDeviceIcon() {
  return (
    <Wrap>
      <Link to={routes.newDevice}>
        <FaPlus color="#fff" />
      </Link>
    </Wrap>
  );
}

export default AddDeviceIcon;
