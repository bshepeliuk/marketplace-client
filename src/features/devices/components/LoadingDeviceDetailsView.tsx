import React from 'react';
import styled from 'styled-components';

function LoadingDeviceDetailsView() {
  return (
    <Wrap>
      <div>Loading...</div>
    </Wrap>
  );
}

const Wrap = styled.div`
  height: var(--default-height);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingDeviceDetailsView;
