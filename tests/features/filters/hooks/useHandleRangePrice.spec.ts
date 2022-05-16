import { renderHook, act } from '@testing-library/react-hooks';
import useHandleRangePrice from '@src/features/filters/hooks/useHandleRangePrice';

describe('useHandleRangePrice', () => {
  test('initial rendering', () => {
    const { result } = renderHook(() => useHandleRangePrice());

    expect(result.current.range).toEqual([0, 0]);
    expect(typeof result.current.setRange).toBe('function');
    expect(typeof result.current.handleRangeChange).toBe('function');
  });

  test('setRange should change initial values', () => {
    const { result } = renderHook(() => useHandleRangePrice());

    act(() => {
      result.current.setRange([11, 22]);
    });

    expect(result.current.range).toEqual([11, 22]);
  });
});
