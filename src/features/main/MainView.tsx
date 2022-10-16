import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderView from '@src/common/components/Header/HeaderView';
import useCheckUserRole from '@src/common/hooks/useCheckUserRole';
import PrivateRoute from '@src/app/PrivateRoute';
import { routes } from '@src/app/Router';
import HomeView from '../home/HomeView';
import DeviceDetailsView from '../devices/pages/DeviceDetailsView';
import DevicesByCategoryView from '../devices/pages/DevicesByCategoryView';
import CartView from '../cart/pages/CartView';
import SearchResultView from '../search/page/SearchResultView';
import PaymentCheckoutCancel from '../payment/pages/PaymentCheckoutCancel';
import PaymentCheckoutSuccess from '../payment/pages/PaymentCheckoutSuccess';
import AccountView from '../account/pages/AccountView';
import ForbiddenView from '../forbidden/ForbiddenView';
import NotFoundView from '../notFound/NotFoundView';
import NewDeviceView from '../addNewDevice/pages/NewDeviceView';
import ComparisonView from '../comparison/pages/ComparisonView';
import StripeAccountCreatedView from '../stripe/page/AccountCreatedView';
import OrdersView from '../orders/pages/OrdersView';
import PurchasesView from '../purchases/pages/PurchasesView';

function MainView() {
  const { isSeller, isBuyer } = useCheckUserRole();

  return (
    <>
      <HeaderView />

      <Routes>
        <Route path={`${routes.home}*`} element={<HomeView />} />
        <Route path={`${routes.device}/*`} element={<DeviceDetailsView />} />
        <Route path={routes.comparison} element={<ComparisonView />} />
        <Route path={routes.devices} element={<DevicesByCategoryView />} />
        <Route path={routes.cart} element={<CartView />} />
        <Route path={routes.searchResult} element={<SearchResultView />} />
        <Route path={routes.checkoutCancel} element={<PaymentCheckoutCancel />} />
        <Route path={routes.checkoutSuccess} element={<PaymentCheckoutSuccess />} />
        <Route path={routes.stripeAccountSuccess} element={<StripeAccountCreatedView />} />
        <Route
          path={routes.orders}
          element={
            <PrivateRoute isAllowed={isSeller}>
              <OrdersView />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.purchases}
          element={
            <PrivateRoute isAllowed={isBuyer}>
              <PurchasesView />
            </PrivateRoute>
          }
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
            <PrivateRoute isAllowed={isSeller}>
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
