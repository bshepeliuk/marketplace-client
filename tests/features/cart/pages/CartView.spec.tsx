import CartView from '@src/features/cart/pages/CartView';
import { fireEvent } from '@testing-library/react';
import { getCartSum } from '@src/features/cart/modules/cartCalcModule';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import { mockStripe } from '../../../mocks/stripe';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { goods } from '../../../mocks/data';

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => mockStripe(),
}));

jest.mock('@features/payment/pages/hooks/useMakePayment');

const rootState = {
  entities: {},
  auth: {
    isLoggedIn: true,
  },
  devices: {
    isLoading: false,
    items: [],
  },
  cart: {
    items: [],
  },
};

describe('[PAGES]: CartView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render empty cart by default.', async () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      pay: jest.fn(),
      isPending: false,
    });

    const { getByText } = setupAndRenderComponent({
      component: CartView,
      state: rootState,
    });

    expect(getByText(/Unfortunately your cart is empty yet./i)).toBeInTheDocument();
  });

  test('render items from cart and total sum.', async () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      pay: jest.fn(),
      isPending: false,
    });

    const { getByText } = setupAndRenderComponent({
      component: CartView,
      state: { ...rootState, cart: { items: goods } },
    });

    for (const item of goods) {
      expect(getByText(item.name)).toBeInTheDocument();
    }

    const sum = getCartSum(goods);

    expect(getByText(`Total: ${sum}`)).toBeInTheDocument();
  });

  test('should render purchase button.', async () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      pay: jest.fn(),
      isPending: false,
    });

    const { getByText } = setupAndRenderComponent({
      component: CartView,
      state: { ...rootState, cart: { items: goods } },
    });

    expect(getByText(/pay for it/i)).toBeInTheDocument();
  });

  test('purchase button should call pay method from useMakePayment hook.', async () => {
    const mockPayMethod = jest.fn();

    (useMakePayment as jest.Mock).mockReturnValue({
      pay: mockPayMethod,
      isPending: false,
    });

    const { getByText } = setupAndRenderComponent({
      component: CartView,
      state: { ...rootState, cart: { items: goods } },
    });

    const PurchaseBtn = getByText(/pay for it/i) as HTMLButtonElement;

    expect(PurchaseBtn).toBeInTheDocument();

    fireEvent.click(PurchaseBtn);

    expect(PurchaseBtn.disabled).toBeFalsy();
    expect(mockPayMethod).toBeCalledTimes(1);
  });

  test('purchase button should be disabled.', async () => {
    const mockPayMethod = jest.fn();

    (useMakePayment as jest.Mock).mockReturnValue({
      pay: mockPayMethod,
      isPending: true,
    });

    const { getByText } = setupAndRenderComponent({
      component: CartView,
      state: { ...rootState, cart: { items: goods } },
    });
    const PurchaseBtn = getByText(/Processing.../i) as HTMLButtonElement;

    expect(PurchaseBtn).toBeInTheDocument();

    fireEvent.click(PurchaseBtn);

    expect(PurchaseBtn.disabled).toBeTruthy();
    expect(mockPayMethod).not.toBeCalled();
  });
});
