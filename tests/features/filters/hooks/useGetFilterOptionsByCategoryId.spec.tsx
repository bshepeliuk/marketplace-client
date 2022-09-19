import React from 'react';
import useGetFilterOptionsByCategoryId from '@features/filters/hooks/useGetFilterOptionsByCategoryId';
import { getFilterOptionsByCategoryId } from '@src/features/filters/filtersSlice';
import groupBy from '@src/common/utils/groupBy';
import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { Wrapper } from '../../../wrapper';
import { mockOptions } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

jest.mock('@features/filters/filtersSlice', () => ({
  ...jest.requireActual('@features/filters/filtersSlice'),
  __esModule: true,
  getFilterOptionsByCategoryId: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('useGetFilterOptionsByCategoryId', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('in case filter options were previously fetched, should not fetch it again.', () => {
    const { result } = renderHook(() => useGetFilterOptionsByCategoryId(1), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper
          {...props}
          state={{
            ...rootStateMock,
            filters: {
              ...rootStateMock.filters,
              options: {
                ...rootStateMock.filters.options,
                items: mockOptions,
              },
            },
          }}
        />
      ),
    });

    expect(result.current.items).toHaveLength(groupBy(mockOptions, 'title').length);
    expect(getFilterOptionsByCategoryId).not.toBeCalledWith({ categoryId: 1 });
  });

  test('in case state does not have filter options, should fetch it.', () => {
    renderHook(() => useGetFilterOptionsByCategoryId(1), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getFilterOptionsByCategoryId).toBeCalledWith({ categoryId: 1 });
  });

  test('in case category ID was not provided should not call filter action.', () => {
    const { result } = renderHook(() => useGetFilterOptionsByCategoryId(undefined), {
      wrapper: Wrapper,
    });

    expect(result.current.items).toHaveLength(0);
    expect(getFilterOptionsByCategoryId).toBeCalledTimes(0);
  });
});
