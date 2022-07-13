import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './Router';

interface IProps {
  children: React.ReactElement;
  isAllowed: boolean;
}

function PrivateRoute({ children, isAllowed }: IProps) {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  if (isLoggedIn && !isAllowed) {
    return <Navigate to={routes.forbidden} />;
  }

  return isLoggedIn && isAllowed ? children : <Navigate to={routes.login} />;
}

export default PrivateRoute;
