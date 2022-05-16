import { renderHook, act } from '@testing-library/react-hooks';
import useCheckFirstRender from '@src/common/hooks/useCheckFirstRender';

describe('useCheckFirstRender', () => {
  test('should return true on initial render', () => {
    const { result } = renderHook(() => useCheckFirstRender());

    expect(result.current).toBe(true);
  });

  test('should return false on all further re-renders', () => {
    const { result, rerender } = renderHook(() => useCheckFirstRender());

    act(() => {
      rerender();
    });

    expect(result.current).toBe(false);
  });
});
