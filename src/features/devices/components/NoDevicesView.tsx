import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  // 80px - header; 80px - margin-bottom;
  height: calc(100vh - 80px - 80px);
  align-items: center;
`;

function NoDevicesView() {
  return <Wrap>No devices in this category yet.</Wrap>;
}

export default NoDevicesView;
