import React from 'react';
import styled from 'styled-components';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

function AccountView() {
  const { user } = useTypedSelector((state) => state.auth);
  return (
    <>
      <HeaderView />
      <Wrap>
        <h1>{user?.fullName}</h1>
        <p>{user?.role}</p>
      </Wrap>
    </>
  );
}

export default AccountView;
