import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { comparisonActions } from '@src/features/comparison/comparisonSlice';
import useGetDevicesForComparison from '@features/comparison/hooks/useGetDevicesForComparison';
import { COMPARISON_STORAGE_KEY } from '@src/features/comparison/constants';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonItemsMock } from '../../../mocks/data';

const populateDevicesForComparison = jest.spyOn(comparisonActions, 'populate');

describe('[HOOK]: useGetDevicesForComparison', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should return devices for comparison.', () => {
    const { result } = renderHook(() => useGetDevicesForComparison(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(result.current.items).toEqual(comparisonItemsMock);
  });

  test('should add to state devices from localStorage.', () => {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(comparisonItemsMock));

    renderHook(() => useGetDevicesForComparison(), {
      wrapper: Wrapper,
    });

    expect(populateDevicesForComparison).toBeCalledWith({ items: comparisonItemsMock });
  });
});
