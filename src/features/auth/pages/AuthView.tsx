import React from 'react';
import { useTypedSelector } from '@common/hooks/main/useTypedSelector';
import { routes } from '@src/app/Router';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LoginView from '../components/LoginView';
import RegisterView from '../components/RegisterView';
import AuthHeaderView from '../components/AuthHeaderView';

function AuthView() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn && <Navigate to={routes.home} />}

      <Wrap>
        <AuthHeaderView />

        <Routes>
          <Route index element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
`;

export default AuthView;
