import React from 'react';
import useLogin from '@common/hooks/auth/useLogin';

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
    </div>
  );
}

export default LoginView;
