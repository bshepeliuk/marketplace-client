export const mockStripeElement = () => ({
  mount: jest.fn(),
  destroy: jest.fn(),
  on: jest.fn(),
  update: jest.fn(),
});

export const mockStripeElements = () => {
  const elements = {} as any;
  return {
    create: jest.fn((type) => {
      elements[type] = mockStripeElement();
      return elements[type];
    }),
    getElement: jest.fn((type) => {
      return elements[type] || null;
    }),
  };
};

export const mockStripe = () => ({
  elements: jest.fn(() => mockStripeElements()),
  createToken: jest.fn(),
  createSource: jest.fn(),
  createPaymentMethod: jest.fn(),
  confirmCardPayment: jest.fn(),
  confirmCardSetup: jest.fn(),
  paymentRequest: jest.fn(),
  redirectToCheckout: jest.fn(),
  _registerWrapper: jest.fn(),
});
