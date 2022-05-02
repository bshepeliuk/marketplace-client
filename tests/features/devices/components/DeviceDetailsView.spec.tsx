import { fireEvent, screen } from '@testing-library/react';
import Router from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import DeviceDetailsView from '@features/devices/pages/DeviceDetailsView';
import { BASE_API_URL } from '@src/common/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

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

describe('DeviceDetailsView', () => {
  const device = {
    id: 1,
    images: [1],
    name: 'HP Pavillion - test',
    price: 1234,
    info: [],
  };

  const rootState = {
    entities: {
      devices: {
        1: device,
      },
      images: {
        1: { id: 1, url: 'https://image.jpeg' },
      },
    },
    auth: {
      isLoggedIn: true,
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
  };

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should find and render device.', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ deviceId: device.id.toString() });

    const { getByText, getByAltText } = setupAndRenderComponent({
      state: rootState,
      component: DeviceDetailsView,
    });

    const deviceTitle = getByText(device.name);
    const deviceImg = getByAltText(device.name);
    const purchaseBtn = getByText(/purchase/i);
    const priceField = getByText(/price: 1234/i);
    const goBackBtn = getByText(/go back/i);

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
  });
  // eslint-disable-next-line max-len
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
