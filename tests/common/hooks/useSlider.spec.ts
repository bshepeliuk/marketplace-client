/* eslint-disable max-len */
import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useSlider, { SlideDirection } from '@src/common/hooks/useSlider';

describe('[HOOK]: useSlider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return object with correct init values.', () => {
    const { result } = renderHook(() => {
      return useSlider({ startIdx: 0, lastIdx: 2, delay: 0 });
    });

    expect(typeof result.current.setActiveIdx).toBe('function');
    expect(typeof result.current.onLeftClick).toBe('function');
    expect(typeof result.current.onRightClick).toBe('function');
    expect(result.current.activeIdx).toBe(0);
    expect(result.current.slideDirection).toBe('none');
  });

  test('In case activeIdx is equal to startIdx and onLeftClick method was called then activeIdx should be equal to lastIdx.', async () => {
    const startIdx = 0;
    const lastIdx = 2;

    const { result } = renderHook(() => {
      return useSlider({ startIdx, lastIdx, delay: 0 });
    });

    act(() => {
      result.current.onLeftClick();
      result.current.onLeftClick();
    });

    await waitFor(() => {
      expect(result.current.activeIdx).toBe(lastIdx);
    });
  });

  test('should change activeIdx correctly.', async () => {
    const startIdx = 0;
    const lastIdx = 2;

    const { result, waitForNextUpdate } = renderHook(() => {
      return useSlider({ startIdx, lastIdx, delay: 0 });
    });

    act(() => {
      result.current.onRightClick();
    });

    await waitForNextUpdate();

    expect(result.current.activeIdx).toBe(1);

    act(() => {
      result.current.onLeftClick();
    });

    await waitForNextUpdate();

    expect(result.current.activeIdx).toBe(0);
  });

  test('In case activeIdx is equal to lastIdx and onRightClick method was called then activeIdx should be equal to startIdx.', async () => {
    const startIdx = 0;
    const lastIdx = 2;

    const { result, waitForNextUpdate } = renderHook(() => {
      return useSlider({ startIdx, lastIdx, delay: 0 });
    });

    act(() => {
      result.current.onRightClick();
    });

    await waitForNextUpdate();

    act(() => {
      result.current.onRightClick();
    });

    await waitForNextUpdate();

    act(() => {
      result.current.onRightClick();
    });

    await waitForNextUpdate();

    expect(result.current.activeIdx).toBe(0);
  });

  test('should set slideDirection value to "none" when activeIdx has changed.', async () => {
    const startIdx = 0;
    const lastIdx = 2;

    const { result, waitForNextUpdate } = renderHook(() => {
      return useSlider({ startIdx, lastIdx, delay: 0 });
    });

    act(() => {
      result.current.onRightClick();
    });

    await waitForNextUpdate();

    expect(result.current.activeIdx).toBe(1);
    expect(result.current.slideDirection).toBe(SlideDirection.None);
  });
});
