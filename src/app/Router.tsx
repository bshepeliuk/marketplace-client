import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundView from '@features/notFound/NotFoundView';
import HomeView from '@src/features/home/HomeView';
import AuthView from '@src/features/auth/AuthView';

export const routes = {
  home: '/',
  auth: '/auth/*',
  login: '/auth/login',
  register: '/auth/register',
  devices: '/devices',
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomeView />} />
        <Route path={routes.auth} element={<AuthView />} />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
