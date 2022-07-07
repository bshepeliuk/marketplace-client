import SearchResultView from '@src/features/search/page/SearchResultView';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import { normalize } from 'normalizr';
import { DevicesSchema } from '@src/common/normalizeSchemas';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 20; // 400px - DeviceItem height, 20 - count of devices
    return children({ height, width: 1440 });
  };
});

const device = {
  id: 1,
  name: 'HP Pavillion 15 eh1021-ua',
  price: 33448,
  brandId: 2,
  typeId: 1,
  userId: 1,
  quantity: 1,
  images: [{ id: 1, url: 'https://image.jpeg' }],
  info: [],
  count: 1,
  createdAt: '2022-01-05T16:57:37.787Z',
  updatedAt: '2022-01-05T16:57:37.787Z',
};

const { result, entities } = normalize([device], DevicesSchema);

const rootState = {
  entities,
  auth: {
    isLoggedIn: true,
  },
  devices: {
    isLoading: false,
    items: result,
  },
  cart: { items: [] },
};

describe('[PAGES]:SearchResultView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render found list.', async () => {
    const { getByText } = setupAndRenderComponent({
      component: SearchResultView,
      props: {
        containerRef: { current: {} },
        items: [device],
        isLoading: false,
        isLoadingMore: false,
        fetchMore: () => {},
      },
      state: rootState,
    });

    expect(getByText(device.name, { exact: false })).toBeInTheDocument();
  });
});
