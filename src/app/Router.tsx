import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundView from '@features/notFound/NotFoundView';
import HomeView from '@features/home/HomeView';
import AuthView from '@features/auth/pages/AuthView';
import DeviceDetailsView from '@src/features/devices/pages/DeviceDetailsView';
import DevicesView from '@src/features/devices/pages/DevicesView';
import AccountView from '@features/account/pages/AccountView';
import CartView from '@src/features/cart/pages/CartView';
import PaymentCheckoutSuccess from '@features/payment/pages/PaymentCheckoutSuccess';
import PaymentCheckoutCancel from '@features/payment/pages/PaymentCheckoutCancel';
import PrivateRoute from './PrivateRoute';

export const routes = {
  home: '/',
  auth: '/auth/*',
  login: '/auth/login',
  register: '/auth/register',
  devices: '/devices',
  device: '/devices/:deviceId',
  account: '/account',
  cart: '/cart',
  checkoutSuccess: '/checkout-success',
  checkoutCancel: '/checkout-cancel',
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomeView />} />
        <Route path={routes.auth} element={<AuthView />} />
        <Route path={routes.device} element={<DeviceDetailsView />} />
        <Route path={routes.devices} element={<DevicesView />} />
        <Route path={routes.cart} element={<CartView />} />
        <Route
          path={routes.checkoutCancel}
          element={<PaymentCheckoutCancel />}
        />
        <Route
          path={routes.checkoutSuccess}
          element={<PaymentCheckoutSuccess />}
        />
        <Route
          path={routes.account}
          element={
            <PrivateRoute isAllowed>
              <AccountView />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
