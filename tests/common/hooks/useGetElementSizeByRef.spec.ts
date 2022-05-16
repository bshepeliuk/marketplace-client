import { renderHook } from '@testing-library/react-hooks';
import useGetElementSizeByRef from '@src/common/hooks/useGetElementSizeByRef';
import { RefObject } from 'react';

describe('useGetElementSizeByRef', () => {
  test('should have size by ref', () => {
    const ref = {
      current: {
        clientHeight: 200,
        clientWidth: 400,
      },
    } as RefObject<HTMLElement>;

    const { result } = renderHook(() => useGetElementSizeByRef(ref));

    expect(result.current.height).toBe(200);
    expect(result.current.width).toBe(400);
  });

  test('should have initial height and width', () => {
    const ref = {} as RefObject<HTMLElement>;

    const { result } = renderHook(() => useGetElementSizeByRef(ref));

    expect(result.current.height).toBe(0);
    expect(result.current.width).toBe(0);
  });
});
