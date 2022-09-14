import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useGetComparisonTable from '@features/comparison/hooks/useGetComparisonTable';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';
import { comparisonTableMock } from '../../../mocks/data';

describe('[HOOK]: useGetComparisonTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should return empty comparison table by default.', () => {
    const { result } = renderHook(() => useGetComparisonTable(), {
      wrapper: Wrapper,
    });

    expect(result.current.table).toEqual({ body: [], header: [] });
    expect(result.current.hasNoItemsForComparison).toBeTruthy();
  });

  test('should return filled in comparison table from state.', () => {
    const { result } = renderHook(() => useGetComparisonTable(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(result.current.table).toEqual(comparisonTableMock);
    expect(result.current.hasNoItemsForComparison).toBeFalsy();
  });
});
