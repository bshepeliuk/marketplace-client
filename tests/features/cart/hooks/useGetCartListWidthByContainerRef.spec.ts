/* eslint-disable max-len */
import { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useGetCartListWidthByContainerRef from '@src/features/cart/hooks/useGetCartListWidthByContainerRef';

const DEFAULT_LIST_WIDTH = 650;
const MEDIUM_LIST_WIDTH = 520;
const SMALL_LIST_WIDTH = 400;
const EXTRA_SMALL_LIST_WIDTH = 360;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('[HOOK]: useGetCartListWidthByContainerRef', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should return default list width.', () => {
    const containerRef = { current: { offsetWidth: 1200 } };
    (useRef as jest.Mock).mockReturnValueOnce(containerRef);

    const { result } = renderHook(() => useGetCartListWidthByContainerRef());

    expect(result.current.LIST_WIDTH).toBe(DEFAULT_LIST_WIDTH);
  });

  test('should return medium list width.', () => {
    const containerRef = { current: { offsetWidth: 700 } };
    (useRef as jest.Mock).mockReturnValueOnce(containerRef);

    const { result } = renderHook(() => useGetCartListWidthByContainerRef());

    expect(result.current.LIST_WIDTH).toBe(MEDIUM_LIST_WIDTH);
  });

  test('should return small list width.', () => {
    const containerRef = { current: { offsetWidth: 600 } };
    (useRef as jest.Mock).mockReturnValueOnce(containerRef);

    const { result } = renderHook(() => useGetCartListWidthByContainerRef());

    expect(result.current.LIST_WIDTH).toBe(SMALL_LIST_WIDTH);
  });

  test('should return extra small list width.', () => {
    const containerRef = { current: { offsetWidth: 420 } };
    (useRef as jest.Mock).mockReturnValueOnce(containerRef);

    const { result } = renderHook(() => useGetCartListWidthByContainerRef());

    expect(result.current.LIST_WIDTH).toBe(EXTRA_SMALL_LIST_WIDTH);
  });
});
