import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  height: calc(100vh - 80px - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ErrorMessageView() {
  return (
    <Wrap>Unfortunately something went wrong. Kindly try again later.</Wrap>
  );
}

export default ErrorMessageView;
