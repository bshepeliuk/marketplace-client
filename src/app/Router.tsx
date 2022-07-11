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
import NewDeviceView from '@features/addNewDevice/pages/NewDeviceView';
import ForbiddenView from '@features/forbidden/ForbiddenView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import SearchResultView from '@features/search/page/SearchResultView';
import { ROLES } from '@src/common/constants';
import PrivateRoute from './PrivateRoute';

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
};

function Router() {
  const { user } = useTypedSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<HomeView />} />
        <Route path={routes.auth} element={<AuthView />} />
        <Route path={`${routes.device}/*`} element={<DeviceDetailsView />} />
        <Route path={routes.devices} element={<DevicesView />} />
        <Route path={routes.cart} element={<CartView />} />
        <Route path={routes.searchResult} element={<SearchResultView />} />
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
        <Route
          path={`${routes.newDevice}/*`}
          element={
            <PrivateRoute isAllowed={ROLES.SELLER === user?.role}>
              <NewDeviceView />
            </PrivateRoute>
          }
        />

        <Route path={routes.forbidden} element={<ForbiddenView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
