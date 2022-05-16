import { renderHook, act } from '@testing-library/react-hooks';
import useHandleInputsPrice from '@src/features/filters/hooks/useHandleInputsPrice';

describe('useHandleInputsPrice', () => {
  test('initial rendering', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    expect(result.current.values).toEqual([0, 0]);
    expect(typeof result.current.setValues).toBe('function');
    expect(typeof result.current.handleInputChange).toBe('function');
  });

  test('setValues should change initial values', () => {
    const { result } = renderHook(() => useHandleInputsPrice());

    act(() => {
      result.current.setValues([1, 2]);
    });

    expect(result.current.values).toEqual([1, 2]);
  });
});
