import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderView from '@src/common/components/Header/HeaderView';
import useCheckUserRole from '@src/common/hooks/useCheckUserRole';
import PrivateRoute from '@src/app/PrivateRoute';
import { routes } from '@src/app/Router';

const HomeView = React.lazy(() => import('../home/HomeView'));
const DeviceDetailsView = React.lazy(() => import('../devices/pages/DeviceDetailsView'));
const ComparisonView = React.lazy(() => import('../comparison/pages/ComparisonView'));
const DevicesByCategoryView = React.lazy(() => import('../devices/pages/DevicesByCategoryView'));
const CartView = React.lazy(() => import('../cart/pages/CartView'));
const SearchResultView = React.lazy(() => import('../search/page/SearchResultView'));
const NewDeviceView = React.lazy(() => import('../addNewDevice/pages/NewDeviceView'));
const OrdersView = React.lazy(() => import('../orders/pages/OrdersView'));
const PurchasesView = React.lazy(() => import('../purchases/pages/PurchasesView'));
const StatsView = React.lazy(() => import('../stats/pages/StatsView'));
const MoneyMoveMentView = React.lazy(() => import('../moneyMovement/pages/MoneyMovementView'));
const StripeAccountCreatedView = React.lazy(() => import('../stripe/page/AccountCreatedView'));
const AccountView = React.lazy(() => import('../account/pages/AccountView'));
const ForbiddenView = React.lazy(() => import('../forbidden/ForbiddenView'));
const NotFoundView = React.lazy(() => import('../notFound/NotFoundView'));
const PaymentCheckoutSuccess = React.lazy(() => import('../payment/pages/PaymentCheckoutSuccess'));
const PaymentCheckoutCancel = React.lazy(() => import('../payment/pages/PaymentCheckoutCancel'));
const RecentlyViewedDevices = React.lazy(() => import('../recentlyViewed/pages/RecentlyViewed'));

function MainView() {
  const { isSeller, isBuyer } = useCheckUserRole();

  return (
    <>
      <HeaderView />

      <Suspense fallback={null}>
        <Routes>
          <Route path={routes.home} element={<HomeView />} />
          <Route path={routes.recentlyViewed} element={<RecentlyViewedDevices />} />
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
            path={`${routes.stats}/*`}
            element={
              <PrivateRoute isAllowed={isSeller}>
                <StatsView />
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

          <Route
            path={`${routes.moneyMovement}/*`}
            element={
              <PrivateRoute isAllowed={isSeller}>
                <MoneyMoveMentView />
              </PrivateRoute>
            }
          />

          <Route path={routes.forbidden} element={<ForbiddenView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default MainView;
