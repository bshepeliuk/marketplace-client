import HeaderView from '@src/common/components/Header/HeaderView';
import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ForbiddenView() {
  return (
    <>
      <HeaderView />
      <Wrap>Forbidden.</Wrap>
    </>
  );
}

export default ForbiddenView;
