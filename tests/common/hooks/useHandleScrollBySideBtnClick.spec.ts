import { RefObject } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useHandleScrollBySideBtnClick from '@common/hooks/useHandleScrollBySideBtnClick';

describe('useHandleScrollBySideBtnClick', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('left and right arrow btn should be hidden', () => {
    const ref = {
      current: {
        scrollWidth: 0,
        clientWidth: 0,
        scrollLeft: 0,
      },
    } as RefObject<HTMLElement>;

    const { result } = renderHook(() => useHandleScrollBySideBtnClick(ref, 5));

    expect(result.current.isLeftVisible).toBeFalsy();
    expect(result.current.isRightVisible).toBeFalsy();
  });

  test('right and left arrow buttons should be visible', () => {
    const ref = {
      current: {
        scrollWidth: 800,
        clientWidth: 250,
        scrollLeft: 10,
        scrollTo() {},
      },
    } as RefObject<HTMLElement>;

    const { result } = renderHook(() => useHandleScrollBySideBtnClick(ref, 5));

    act(() => {
      result.current.onLeftClick();
    });

    act(() => {
      result.current.onRightClick();
    });

    expect(typeof result.current.onLeftClick).toBe('function');
    expect(typeof result.current.onRightClick).toBe('function');

    expect(result.current.isLeftVisible).toBeTruthy();
    expect(result.current.isRightVisible).toBeTruthy();
  });

  test('in case ref was not passed should have initial values', () => {
    const ref = {} as RefObject<HTMLElement>;

    const { result } = renderHook(() => useHandleScrollBySideBtnClick(ref, 5));

    expect(result.current.isLeftVisible).toBeFalsy();
    expect(result.current.isRightVisible).toBeFalsy();
  });
});
