import React from 'react';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { routes } from '@src/app/Router';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';

function AuthView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn && <Navigate to={routes.home} />}

      <Routes>
        <Route index element={<LoginView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </>
  );
}

export default AuthView;
