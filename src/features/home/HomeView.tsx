import React from 'react';
import useLogout from '@common/hooks/auth/useLogout';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';

function HomeView() {
  const { onLogout } = useLogout();
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <div>
      Home View
      {isLoggedIn && (
        <button type="button" onClick={onLogout}>
          logout
        </button>
      )}
    </div>
  );
}

export default HomeView;
