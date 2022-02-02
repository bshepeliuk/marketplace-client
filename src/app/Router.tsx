import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundView from '@features/notFound/NotFoundView';
import HomeView from '@features/home/HomeView';
import AuthView from '@features/auth/AuthView';
import DeviceDetailsView from '@features/devices/components/DeviceDetailsView';

export const routes = {
  home: '/',
  auth: '/auth/*',
  login: '/auth/login',
  register: '/auth/register',
  devices: '/devices',
  device: '/devices/:deviceId',
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomeView />} />
        <Route path={routes.auth} element={<AuthView />} />
        <Route path={routes.device} element={<DeviceDetailsView />} />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
