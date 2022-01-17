import React from 'react';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { routes } from '@src/app/Router';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

function AuthView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn && <Navigate to={routes.home} />}

      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </>
  );
}

export default AuthView;
