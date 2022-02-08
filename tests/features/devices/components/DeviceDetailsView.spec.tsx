import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeviceDetailsView from '@features/devices/components/DeviceDetailsView';
import Router from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const device = {
  id: 1,
  images: ['https://image.jpeg'],
  name: 'HP Pavillion - test',
  price: 1234,
};

const rootState = {
  entities: {
    devices: {
      1: device,
    },
  },
  auth: {
    isLoggedIn: true,
  },
  devices: {
    isLoading: false,
    items: [1],
    device: {
      isLoading: false,
    },
  },
};

const mockStore = configureMockStore([thunk]);

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
  useLocation: () => ({
    state: { rowIndex: 1 },
  }),
}));

const setupAndRenderDeviceView = ({ state }: any) => {
  const store = mockStore(state);

  return render(
    <Provider store={store}>
      <Router.MemoryRouter>
        <DeviceDetailsView />
      </Router.MemoryRouter>
    </Provider>,
  );
};

describe('DeviceDetailsView', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should find and render device.', async () => {
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ deviceId: device.id.toString() });

    const { getByText, getByAltText } = setupAndRenderDeviceView({
      state: rootState,
    });

    const deviceTitle = getByText(device.name);
    const deviceImg = getByAltText(device.name);
    const purchaseBtn = getByText(/purchase/i);
    const priceField = getByText(/price: 1234/i);
    const goBackBtn = getByText(/go back/i);

    fireEvent.click(goBackBtn);

    expect(goBackBtn).toBeInTheDocument();
    expect(mockedNavigate).toBeCalledWith('/', { state: { rowIndex: 1 } });

    expect(priceField).toBeInTheDocument();
    expect(purchaseBtn).toBeInTheDocument();
    expect(deviceImg).toBeInTheDocument();
    expect(deviceTitle).toBeInTheDocument();
  });
  // eslint-disable-next-line max-len
  test('when device ID is not correct, should render message that such device not found', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ deviceId: '999' });

    const { getByText } = setupAndRenderDeviceView({ state: rootState });

    const notFoundDeviceInfo = getByText(/this device was not found./i);

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

    const { getByText } = setupAndRenderDeviceView({ state });
    const loader = getByText(/Loading.../i);

    expect(loader).toBeInTheDocument();
  });
});
