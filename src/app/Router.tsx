import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MainView = React.lazy(() => import('@features/main/MainView'));
const AuthView = React.lazy(() => import('@features/auth/pages/AuthView'));

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
  moneyMovement: '/money-movement',
  transfers: '/money-movement/transfers',
  payouts: '/money-movement/payouts',
};

function Router() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainView />} />
          <Route path={routes.auth} element={<AuthView />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
