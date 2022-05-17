import React from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';

function AccountView() {
  const { user } = useTypedSelector((state) => state.auth);
  return (
    <>
      <HeaderView />
      <div>
        <h1>{user?.fullName}</h1>
        <p>{user?.role}</p>
      </div>
    </>
  );
}

export default AccountView;
