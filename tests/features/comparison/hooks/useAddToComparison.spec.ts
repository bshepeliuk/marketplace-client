import { renderHook, act } from '@testing-library/react-hooks';
import useAddToComparison from '@src/features/comparison/hooks/useAddToComparison';
import { COMPARISON_STORAGE_KEY } from '@features/comparison/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

const localStorageSetItemMock = jest.spyOn(Storage.prototype, 'setItem');

describe('[HOOK]: useAddToComparison', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should have method for adding device to comparison.', () => {
    const { result } = renderHook(() => useAddToComparison(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.addToComparison).toBe('function');
  });

  test('should add device to comparison.', () => {
    const { result } = renderHook(() => useAddToComparison(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.addToComparison(deviceMock);
    });

    expect(localStorageSetItemMock).toBeCalledWith(COMPARISON_STORAGE_KEY, JSON.stringify([deviceMock]));
  });

  test('in case device with the same was previously added, should not add device to comparison', () => {
    const { result } = renderHook(() => useAddToComparison(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.addToComparison(deviceMock);
    });

    act(() => {
      result.current.addToComparison(deviceMock);
    });

    expect(localStorageSetItemMock).toBeCalledTimes(1);
  });
});
