import React from 'react';
import useRegister from '@common/hooks/auth/useRegister';
import { ROLE } from '@src/common/types/api';
import { Link } from 'react-router-dom';
import { routes } from '@src/app/Router';

function RegisterView() {
  const { onRegister } = useRegister();

  const handleRegister = () => {
    onRegister({
      fullName: 'Tony Stark',
      password: '12345',
      email: 'tony@stark.io',
      role: ROLE.BUYER,
    });
  };

  return (
    <div>
      <button type="button" onClick={handleRegister}>
        register
      </button>
      <Link to={routes.login}>go to login</Link>
    </div>
  );
}

export default RegisterView;
