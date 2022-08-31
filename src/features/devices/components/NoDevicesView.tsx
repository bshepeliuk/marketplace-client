import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  height: var(--default-height);
  align-items: center;
`;

function NoDevicesView() {
  return <Wrap>No devices in this category yet.</Wrap>;
}

export default NoDevicesView;
