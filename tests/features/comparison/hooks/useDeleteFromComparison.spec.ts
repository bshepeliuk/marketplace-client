import { renderHook, act } from '@testing-library/react-hooks';
import useDeleteFromComparison from '@features/comparison/hooks/useDeleteFromComparison';
import { COMPARISON_STORAGE_KEY } from '@src/features/comparison/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');

describe('[HOOK]: useDeleteFromComparison', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should have a method for deleting device from comparison by device.id', () => {
    const { result } = renderHook(() => useDeleteFromComparison(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.deleteById).toBe('function');
  });

  test('should delete device from localStorage by device id.', () => {
    const lastDeviceInStorage = { ...deviceMock, id: 100 };

    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify([deviceMock, lastDeviceInStorage]));

    const { result } = renderHook(() => useDeleteFromComparison(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.deleteById(deviceMock.id);
    });

    expect(localStorageSetItemMock).toBeCalledWith(COMPARISON_STORAGE_KEY, JSON.stringify([lastDeviceInStorage]));
  });
});
