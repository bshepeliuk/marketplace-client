import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthView from '@features/auth/pages/AuthView';
import MainView from '@features/main/MainView';

export const routes = {
  home: '/',
  auth: '/auth/*',
  login: '/auth/login',
  register: '/auth/register',
  devices: '/devices',
  device: '/devices/:deviceId',
  deviceWithEntity: '/devices/:deviceId/:entity',
  newDevice: '/new',
  account: '/account',
  cart: '/cart',
  checkoutSuccess: '/checkout-success',
  checkoutCancel: '/checkout-cancel',
  forbidden: '/forbidden',
  searchResult: '/search-result',
  recentlyViewed: '/recently-viewed',
  comparison: '/comparison',
  stripeAccountSuccess: '/stripe-account-success',
  orders: '/orders',
  purchases: '/purchases',
  stats: '/stats',
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainView />} />
        <Route path={routes.auth} element={<AuthView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
