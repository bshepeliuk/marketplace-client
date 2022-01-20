import React from 'react';
import useLogout from '@common/hooks/auth/useLogout';
import { User } from '@src/api/Api';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';

function HomeView() {
  const [user, setUser] = React.useState<any>(null);
  const { onLogout } = useLogout();

  const getUserInfo = async () => {
    const res = await User.get();
    setUser(res.data.user);
  };

  return (
    <div>
      Hello {user && <b>{user.fullName}</b>}
      <button type="button" onClick={getUserInfo}>
        get my info
      </button>
      <button type="button" onClick={onLogout}>
        logout
      </button>
      <Link to={routes.login}>go to login</Link>
    </div>
  );
}

export default HomeView;
