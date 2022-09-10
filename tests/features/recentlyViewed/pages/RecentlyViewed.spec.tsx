import { AutoSizerProps } from 'react-virtualized-auto-sizer';
import RecentlyViewedDevices from '@features/recentlyViewed/pages/RecentlyViewed';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@features/recentlyViewed/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

jest.mock('react-virtualized-auto-sizer', () => {
  return ({ children }: AutoSizerProps) => {
    const height = 400 * 2; // 400px - DeviceItem height, 2 - count of devices
    return children({ height, width: 1440 });
  };
});

describe('[PAGES]: RecentlyViewedDevices', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('in case user does not have recently viewed devices, should render message about it.', () => {
    const { getByText } = setupAndRenderComponent({
      component: RecentlyViewedDevices,
      state: rootStateMock,
    });

    expect(getByText(/You have not viewed any devices yet./i)).toBeInTheDocument();
  });

  test('should render recently viewed devices from local storage.', () => {
    const viewedAt = new Date();
    const recentlyViewedMockString = JSON.stringify([{ ...deviceMock, viewedAt }]);

    localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, recentlyViewedMockString);

    const { getByText } = setupAndRenderComponent({
      component: RecentlyViewedDevices,
      state: rootStateMock,
    });

    expect(getByText(deviceMock.name, { exact: false })).toBeInTheDocument();
    expect(getByText(deviceMock.price, { exact: false })).toBeInTheDocument();
  });
});
