import { useState } from 'react';
import { routes } from '@src/app/Router';
import { IDeviceWithCount } from '@src/features/devices/types';
import { useStripe } from '@stripe/react-stripe-js';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import useCheckUserRole from '@src/common/hooks/useCheckUserRole';
import notifications from '@src/common/utils/notifications';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Api from '@common/api/Api';
import prepareAndGetGoodsForPayment from '../../helpers/prepareAndGetGoodsForPayment';

const useMakePayment = (goods: IDeviceWithCount[]) => {
  const stripe = useStripe();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const { isSeller } = useCheckUserRole();
  const { isLoggedIn, user } = useTypedSelector((state) => state.auth);

  const pay = async () => {
    if (isSeller) {
      notifications.info('Kindly use an account with BUYER role.');
      return;
    }

    if (!isLoggedIn) {
      navigate(routes.login, { state: { from: location.pathname } });
      return;
    }

    if (stripe === null || user === null) return;

    try {
      setIsPending(true);

      const line_items = prepareAndGetGoodsForPayment({ goods, customerId: user.id });

      const res = await Api.Payment.session(line_items, user);

      if ('sessionId' in res.data) {
        stripe.redirectToCheckout({
          sessionId: res.data.sessionId,
        });
      }
    } catch (error) {
      setIsPending(false);
      // TODO: notification;
    }
  };

  return {
    pay,
    isPending,
  };
};

export default useMakePayment;
