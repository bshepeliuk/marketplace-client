import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '@features/auth/hooks/useLogout';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { routes } from '@src/app/Router';
import DeviceListView from '../devices/DeviceListView';

function HeaderView() {
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  return (
    <header>
      <Link to={routes.home}>Marketplace</Link>
      <h1>{user?.fullName}</h1>
      {isLoggedIn && (
        <button type="button" onClick={onLogout}>
          logout
        </button>
      )}
    </header>
  );
}

function HomeView() {
  return (
    <>
      <HeaderView />
      <DeviceListView />
    </>
  );
}

export default HomeView;
