import { ROLES } from '@src/common/constants';
import MainView from '@src/features/main/MainView';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

describe('[ROUTER]: MainView', () => {
  const user = {
    id: 2,
    fullName: 'Leam Neeson',
    role: ROLES.BUYER,
    email: 'leam@neeson.io',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render header for all main routes.', () => {
    const state = {
      entities: { categories: {}, devices: {} },
      categories: {
        items: [],
      },
      auth: {
        user,
        isLoggedIn: true,
      },
      cart: {
        items: [1, 2, 3, 4, 5],
      },
      devices: {
        items: [],
      },
    };

    const { getByText } = setupAndRenderComponent({
      state,
      component: MainView,
    });

    const cartIndicator = getByText(state.cart.items.length);
    const logo = getByText(/Marketplace/i);

    expect(cartIndicator).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
