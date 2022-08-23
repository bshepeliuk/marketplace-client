import { renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line max-len
import useAddToRecentlyViewed from '@features/recentlyViewed/hooks/useAddToRecentlyViewed';
import { RECENTLY_VIEWED_STORAGE_KEY } from '@src/features/recentlyViewed/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');

describe('[HOOK]: useAddToRecentlyViewed', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should add recently viewed device to local storage.', () => {
    const viewedAt = new Date();

    renderHook(() => useAddToRecentlyViewed({ device: deviceMock, viewedAt }), {
      wrapper: Wrapper,
    });

    expect(localStorageSetItemMock).toBeCalledWith(
      RECENTLY_VIEWED_STORAGE_KEY,
      JSON.stringify([{ ...deviceMock, viewedAt }]),
    );
  });

  test('should not add the same device.', () => {
    const viewedAt = new Date();

    const { rerender } = renderHook(
      () => useAddToRecentlyViewed({ device: deviceMock, viewedAt }),
      {
        wrapper: Wrapper,
      },
    );

    rerender();
    rerender();

    expect(localStorageSetItemMock).toBeCalledTimes(1);
  });

  test('in case the device is equal to undefined, should ignore it.', () => {
    const viewedAt = new Date();

    renderHook(() => useAddToRecentlyViewed({ device: undefined, viewedAt }), {
      wrapper: Wrapper,
    });

    expect(localStorageSetItemMock).not.toBeCalled();
  });
});
