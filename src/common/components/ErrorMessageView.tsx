import React from 'react';
import styled from 'styled-components';

function ErrorMessageView() {
  return <Wrap>Unfortunately something went wrong. Kindly try again later.</Wrap>;
}

const Wrap = styled.div`
  height: var(--default-height);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ErrorMessageView;
