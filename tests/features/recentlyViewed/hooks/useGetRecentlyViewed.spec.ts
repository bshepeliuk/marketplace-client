import { renderHook } from '@testing-library/react-hooks';

import useGetRecentlyViewed from '@features/recentlyViewed/hooks/useGetRecentlyViewed';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@src/features/recentlyViewed/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

const viewedAt = new Date();
const recentlyViewedMockString = JSON.stringify([{ ...deviceMock, viewedAt }]);

localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, recentlyViewedMockString);

describe('[HOOK]: useGetRecentlyViewed', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return recently viewed device from local storage', () => {
    renderHook(() => useGetRecentlyViewed(), {
      wrapper: Wrapper,
    });

    expect(localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY)).toEqual(recentlyViewedMockString);
  });
});
