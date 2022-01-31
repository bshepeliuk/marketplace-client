import React from 'react';
import useLogout from '@src/features/auth/hooks/useLogout';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';

function HomeView() {
  const { onLogout } = useLogout();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  return (
    <div>
      Home View <h1>{user?.fullName}</h1>
      {isLoggedIn && (
        <button type="button" onClick={onLogout}>
          logout
        </button>
      )}
    </div>
  );
}

export default HomeView;
