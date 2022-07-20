import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  text-align: center;
`;

function ErrorMessageView() {
  return (
    <Wrap>Unfortunately something went wrong. Kindly try again later.</Wrap>
  );
}

export default ErrorMessageView;
