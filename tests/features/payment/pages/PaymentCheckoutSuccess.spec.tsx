import React from 'react';
import PaymentCheckoutSuccess from '@features/payment/pages/PaymentCheckoutSuccess';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const rootState = {
  auth: { isLoggedIn: true },
  cart: { items: [] },
};

describe('[PAGES]: PaymentCheckoutSuccess', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: () => <PaymentCheckoutSuccess />,
    });

    expect(getByText(/Payment successful!/i)).toBeInTheDocument();
  });
});
