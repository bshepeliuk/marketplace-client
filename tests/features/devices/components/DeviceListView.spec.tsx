import DeviceListView from '@src/features/devices/components/DeviceListView';
import generateDevicesByCount from '../../../helpers/generateDevicesByCount';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const devices = generateDevicesByCount(20);
const devicesEntity = devices.reduce(
  (acc, current) => ({
    ...acc,
    [current.id]: current,
  }),
  {},
);

const deviceIds = devices.map((item) => item.id);

const rootState = {
  entities: {
    devices: devicesEntity,
  },
  auth: {
    isLoggedIn: true,
  },
  devices: {
    isLoading: false,
    items: deviceIds,
  },
};

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: any) => children({ height: 1600, width: 1200 });
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: () => ({
    state: { rowIndex: 0 },
  }),
}));

describe('DeviceListView', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device list.', async () => {
    const { findAllByAltText } = setupAndRenderComponent({
      component: DeviceListView,
      state: rootState,
    });

    const deviceList = await findAllByAltText(/Test Device - [0-9]/i);

    expect(deviceList).toHaveLength(20);
  });

  test('should render loader.', async () => {
    const { getAllByText } = setupAndRenderComponent({
      component: DeviceListView,
      state: {
        ...rootState,
        devices: {
          ...rootState.devices,
          isLoading: true,
        },
      },
    });

    const loaderItems = getAllByText(/Loading.../i);

    expect(loaderItems).toHaveLength(20);
  });
});
