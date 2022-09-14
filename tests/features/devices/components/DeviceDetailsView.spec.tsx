import { fireEvent, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import DeviceDetailsView from '@features/devices/pages/DeviceDetailsView';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { mockStripe } from '../../../mocks/stripe';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

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
    jest.spyOn(Router, 'useParams').mockReturnValue({ deviceId: deviceMock.id.toString() });

    const { getByText, getByTestId } = setupAndRenderComponent({
      state: rootStateMock,
      component: DeviceDetailsView,
    });

    const deviceTitle = getByText(deviceMock.name);
    const purchaseBtn = getByText(/purchase/i);
    const priceField = getByText(deviceMock.price, { exact: false });
    const goBackBtn = getByTestId('back-btn');

    fireEvent.click(goBackBtn);

    expect(goBackBtn).toBeInTheDocument();
    expect(mockedNavigate).toBeCalledWith({ pathname: '/', search: undefined }, { state: { rowIndex: 1 } });

    expect(priceField).toBeInTheDocument();
    expect(purchaseBtn).toBeInTheDocument();
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

    jest.spyOn(Router, 'useParams').mockReturnValue({ deviceId: deviceMock.id.toString() });

    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
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
        return res(ctx.status(500), ctx.json({ message: 'Something went wrong!' }));
      }),
    );

    jest.spyOn(Router, 'useParams').mockReturnValue({ deviceId: '999' });

    const { findByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: DeviceDetailsView,
    });

    const notFoundDeviceInfo = await findByText(/this device was not found./i);

    expect(notFoundDeviceInfo).toBeInTheDocument();
  });

  test('should render loader.', () => {
    const state = {
      ...rootStateMock,
      devices: {
        ...rootStateMock.devices,
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
