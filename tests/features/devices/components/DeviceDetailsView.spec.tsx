/* eslint-disable max-len */
import { fireEvent, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import DeviceDetailsView from '@features/devices/pages/DeviceDetailsView';
import { BASE_API_URL, ROLES } from '@src/common/constants';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { mockStripe } from '../../../mocks/stripe';

const server = setupServer(
  rest.get(`${BASE_API_URL}/devices/:deviceId`, (req, res, ctx) => {
    return res(ctx.json({ device: {} }));
  }),
  rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
);

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({
    state: {
      rowIndex: 1,
      from: {
        pathname: '/',
      },
    },
  }),
}));

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => mockStripe(),
}));

jest.mock('@features/payment/pages/hooks/useMakePayment');

const device = {
  id: 1,
  images: [1],
  name: 'HP Pavillion - test',
  price: 1234,
  info: [],
  ratings: [],
};

const rootState = {
  entities: {
    devices: {
      1: device,
    },
    images: {
      1: { id: 1, url: 'https://image.jpeg' },
    },
    categories: {},
  },
  auth: {
    isLoggedIn: true,
    user: { id: 1, fullName: 'John Wick', role: ROLES.BUYER },
  },
  categories: {
    items: [],
    isError: false,
    isLoading: false,
  },
  devices: {
    isLoading: false,
    items: [1],
    device: {
      isLoading: false,
    },
  },
  cart: {
    items: [],
  },
};

describe('[PAGES]: DeviceDetailsView', () => {
  const payMethodMock = jest.fn();

  beforeAll(() => {
    server.listen();

    (useMakePayment as jest.Mock).mockReturnValue({
      pay: payMethodMock,
      isPending: false,
    });
  });
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should find and render device.', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ deviceId: device.id.toString() });

    const { getByText, getByAltText, getByTestId } = setupAndRenderComponent({
      state: rootState,
      component: DeviceDetailsView,
    });

    const deviceTitle = getByText(device.name);
    const deviceImg = getByAltText(device.name);
    const purchaseBtn = getByText(/purchase/i);
    const priceField = getByText(/1234/i);
    const goBackBtn = getByTestId('back-btn');

    fireEvent.click(goBackBtn);

    expect(goBackBtn).toBeInTheDocument();
    expect(mockedNavigate).toBeCalledWith(
      { pathname: '/', search: undefined },
      { state: { rowIndex: 1 } },
    );

    expect(priceField).toBeInTheDocument();
    expect(purchaseBtn).toBeInTheDocument();
    expect(deviceImg).toBeInTheDocument();
    expect(deviceTitle).toBeInTheDocument();

    const PurchaseBtn = getByText(/purchase/i) as HTMLButtonElement;

    fireEvent.click(PurchaseBtn);

    expect(payMethodMock).toBeCalledTimes(1);
  });

  test('purchase button should be disabled when isPending (from useMakePayment hook) equal to true', async () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      pay: payMethodMock,
      isPending: true,
    });

    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ deviceId: device.id.toString() });

    const { getByText } = setupAndRenderComponent({
      state: rootState,
      component: DeviceDetailsView,
    });

    const PurchaseBtn = getByText(/purchase/i) as HTMLButtonElement;

    fireEvent.click(PurchaseBtn);

    expect(PurchaseBtn.disabled).toBeTruthy();
    expect(payMethodMock).not.toBeCalled();
  });

  test('when device ID is not correct, should render message that such device not found', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/devices/999`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Something went wrong!' }),
        );
      }),
    );

    jest.spyOn(Router, 'useParams').mockReturnValue({ deviceId: '999' });

    const { findByText } = setupAndRenderComponent({
      state: rootState,
      component: DeviceDetailsView,
    });

    const notFoundDeviceInfo = await findByText(/this device was not found./i);

    expect(notFoundDeviceInfo).toBeInTheDocument();
  });

  test('should render loader.', () => {
    const state = {
      ...rootState,
      devices: {
        ...rootState.devices,
        device: {
          isLoading: true,
        },
      },
    };

    setupAndRenderComponent({
      state,
      component: DeviceDetailsView,
    });

    const loader = screen.getByText(/Loading.../i);

    expect(loader).toBeInTheDocument();
  });
});
