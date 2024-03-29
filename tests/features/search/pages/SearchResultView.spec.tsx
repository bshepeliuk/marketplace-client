import SearchResultView from '@src/features/search/page/SearchResultView';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

const server = setupServer(
  rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
    return res(ctx.json({ devices: [] }));
  }),
);

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 20; // 400px - DeviceItem height, 20 - count of devices
    return children({ height, width: 1440 });
  };
});

describe('[PAGES]:SearchResultView', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render found list.', () => {
    const { getByText } = setupAndRenderComponent({
      component: SearchResultView,
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

  test('should render error when something went wrong.', () => {
    const { getByText } = setupAndRenderComponent({
      component: SearchResultView,
      props: {
        containerRef: { current: {} },
        items: [deviceMock],
        isLoading: false,
        isLoadingMore: false,
        fetchMore: () => {},
      },
      state: {
        ...rootStateMock,
        devices: { ...rootStateMock.devices, isError: true },
      },
    });

    expect(getByText(/Unfortunately something went wrong. Kindly try again later./i)).toBeInTheDocument();
  });

  test('should render "not found" message when devices were not found.', () => {
    const { getByText } = setupAndRenderComponent({
      component: SearchResultView,
      props: {
        containerRef: { current: {} },
        items: [deviceMock],
        isLoading: false,
        isLoadingMore: false,
        fetchMore: () => {},
      },
      state: {
        ...rootStateMock,
        devices: {
          ...rootStateMock.devices,
          hasNoDevices: true,
        },
      },
    });

    expect(getByText(/Not found./i)).toBeInTheDocument();
  });
});
