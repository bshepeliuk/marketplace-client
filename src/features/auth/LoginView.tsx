import React from 'react';
import useLogin from '@common/hooks/auth/useLogin';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';

function LoginView() {
  const { onLogin } = useLogin();

  const handleLogin = () => {
    onLogin({ email: 'tony@stark.io', password: '1234' });
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        login
      </button>

      <Link to={routes.home}>go to home</Link>
    </div>
  );
}

export default LoginView;
