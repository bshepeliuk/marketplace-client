import { renderHook } from '@testing-library/react-hooks';
import useCheckComparison from '@src/features/comparison/hooks/useCheckComparison';
import { COMPARISON_STORAGE_KEY } from '@src/features/comparison/constants';
import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';

describe('[HOOK]: useCheckComparison', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should have a method for checking if the device was previously added.', () => {
    const { result } = renderHook(() => useCheckComparison(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.isUnique).toBe('function');
  });

  test('should return true in case the device was not added earlier.', () => {
    const { result } = renderHook(() => useCheckComparison(), {
      wrapper: Wrapper,
    });

    expect(result.current.isUnique(deviceMock)).toBeTruthy();
  });

  test('should return false in case the device was added earlier.', () => {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify([deviceMock]));

    const { result } = renderHook(() => useCheckComparison(), {
      wrapper: Wrapper,
    });

    expect(result.current.isUnique(deviceMock)).toBeFalsy();
  });
});
