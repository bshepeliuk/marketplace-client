import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderView from '@src/common/components/Header/HeaderView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import { ROLES } from '@src/common/constants';
import PrivateRoute from '@src/app/PrivateRoute';
import { routes } from '@src/app/Router';
import HomeView from '../home/HomeView';
import DeviceDetailsView from '../devices/pages/DeviceDetailsView';
import DevicesView from '../devices/pages/DevicesView';
import CartView from '../cart/pages/CartView';
import SearchResultView from '../search/page/SearchResultView';
import PaymentCheckoutCancel from '../payment/pages/PaymentCheckoutCancel';
import PaymentCheckoutSuccess from '../payment/pages/PaymentCheckoutSuccess';
import AccountView from '../account/pages/AccountView';
import ForbiddenView from '../forbidden/ForbiddenView';
import NotFoundView from '../notFound/NotFoundView';
import NewDeviceView from '../addNewDevice/pages/NewDeviceView';

function MainView() {
  const { user } = useTypedSelector((state) => state.auth);

  return (
    <>
      <HeaderView />

      <Routes>
        <Route path={routes.home} element={<HomeView />} />
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
    </>
  );
}

export default MainView;
