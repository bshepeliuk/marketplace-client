import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL, ROLES } from '@src/common/constants';
import MainView from '@src/features/main/MainView';
import setupAndRenderComponent from '../../helpers/setupAndRenderComponent';

const server = setupServer(
  rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
    return res(ctx.json({ comments: [] }));
  }),
  rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
    return res(ctx.json({ devices: [] }));
  }),
);

const userMock = {
  id: 2,
  fullName: 'Leam Neeson',
  role: ROLES.BUYER,
  email: 'leam@neeson.io',
};

describe('[ROUTER]: MainView', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render header for all main routes.', () => {
    const state = {
      entities: { categories: {}, devices: {} },
      categories: {
        items: [],
      },
      auth: {
        user: userMock,
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
