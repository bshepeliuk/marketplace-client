import { renderHook } from '@testing-library/react-hooks';

import useDeleteViewedOnTTLExpired from '@features/recentlyViewed/hooks/useDeleteViewedOnTTLExpired';
import { convertDayToMs } from '@common/utils/convertDayToMs';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@src/features/recentlyViewed/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');

describe('[HOOK]: useDeleteViewedOnTTLExpired', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should delete recently viewed devices in case TTL has expired.', async () => {
    renderHook(() => useDeleteViewedOnTTLExpired({ ttlInMs: 0 }), {
      wrapper: Wrapper,
    });

    expect(localStorageSetItemMock).toBeCalledWith(RECENTLY_VIEWED_STORAGE_KEY, '[]');
  });

  test('should not delete recently viewed device if TTL has not expired.', async () => {
    const viewedAt = new Date();
    const recentlyViewedMockString = JSON.stringify([{ ...deviceMock, viewedAt }]);

    localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, recentlyViewedMockString);

    renderHook(() => useDeleteViewedOnTTLExpired({ ttlInMs: convertDayToMs(1) }), {
      wrapper: Wrapper,
    });

    expect(localStorageSetItemMock).toBeCalledWith(RECENTLY_VIEWED_STORAGE_KEY, recentlyViewedMockString);
  });
});
