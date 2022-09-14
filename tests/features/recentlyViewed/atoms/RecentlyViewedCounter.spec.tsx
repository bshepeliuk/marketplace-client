import RecentlyViewedCounter from '@features/categories/atoms/RecentlyViewedCounter';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@src/features/recentlyViewed/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';

describe('[ATOMS]: RecentlyViewedCounters', () => {
  const viewedAt = new Date();
  const viewedDevices = [{ ...deviceMock, viewedAt }];

  localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(viewedDevices));

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should render amount of recently viewed devices.', () => {
    localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(viewedDevices));

    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: RecentlyViewedCounter,
    });

    expect(getByText(viewedDevices.length, { exact: false })).toBeInTheDocument();
  });

  test('in case user has not looked at any devices, should not render counter.', () => {
    const { queryByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: RecentlyViewedCounter,
    });

    expect(queryByText(viewedDevices.length, { exact: false })).toBeNull();
  });
});
