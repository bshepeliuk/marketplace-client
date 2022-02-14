import DeviceListView from '@src/features/devices/pages/DeviceListView';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
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
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 20; // 400px - DeviceItem height, 20 - count of devices
    return children({ height, width: 1440 });
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: () => ({
    state: { rowIndex: 0 },
  }),
}));

describe('DeviceListView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device list.', async () => {
    const { findAllByAltText } = setupAndRenderComponent({
      component: DeviceListView,
      state: rootState,
    });

    const deviceList = await findAllByAltText(/Test Device - [0-9]/i);

    expect(deviceList).toHaveLength(devices.length);
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

    expect(loaderItems).toHaveLength(devices.length);
  });
});
