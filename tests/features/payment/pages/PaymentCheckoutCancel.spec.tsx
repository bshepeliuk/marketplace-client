import React from 'react';
import PaymentCheckoutCancel from '@features/payment/pages/PaymentCheckoutCancel';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const rootState = {
  auth: { isLoggedIn: true },
  cart: { items: [] },
};

describe('[PAGES]: PaymentCheckoutCancel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => <PaymentCheckoutCancel />,
    });

    expect(
      getByText(
        /Something went wrong. Kindly recheck your credentials and try again./i,
      ),
    ).toBeInTheDocument();
  });
});
