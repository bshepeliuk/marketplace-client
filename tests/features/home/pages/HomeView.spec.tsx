import { normalize } from 'normalizr';
import HomeView from '@src/features/home/HomeView';
import { DevicesSchema } from '@src/common/normalizeSchemas';
import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { goods } from '../../../mocks/data';

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 2; // 400px - DeviceItem height, 2 - count of devices
    return children({ height, width: 1440 });
  };
});

const { result, entities } = normalize(goods, DevicesSchema);

const rootState = {
  entities,
  auth: {
    isLoggedIn: true,
  },
  devices: {
    isLoading: false,
    items: result,
  },
  categories: {
    isLoading: false,
    items: [],
  },
  cart: {
    items: [],
  },
};

describe('[PAGES]: HomeView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render device list from state', async () => {
    const { getByText } = setupAndRenderComponent({
      component: HomeView,
      state: rootState,
    });

    for (const device of goods) {
      expect(getByText(device.name)).toBeInTheDocument();
    }
  });
});
