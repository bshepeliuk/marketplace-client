import DeviceListView from '@src/features/devices/components/DeviceListView';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { deviceMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

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
    const { getByText } = setupAndRenderComponent({
      component: DeviceListView,
      props: {
        containerRef: { current: {} },
        items: [deviceMock],
        isLoading: false,
        isLoadingMore: false,
        fetchMore: () => {},
      },
      state: rootStateMock,
    });

    expect(getByText(deviceMock.name, { exact: false })).toBeInTheDocument();
  });

  test('should render loader.', async () => {
    const { getAllByText } = setupAndRenderComponent({
      component: DeviceListView,
      props: {
        containerRef: { current: {} },
        items: [],
        isLoading: true,
        isLoadingMore: false,
        fetchMore: () => {},
      },
      state: {
        ...rootStateMock,
        devices: {
          ...rootStateMock.devices,
          isLoading: true,
        },
      },
    });

    const loaderItems = getAllByText(/Loading.../i);

    const AMOUNT_OF_LOADER_ITEMS = 20;

    expect(loaderItems).toHaveLength(AMOUNT_OF_LOADER_ITEMS);
  });
});
