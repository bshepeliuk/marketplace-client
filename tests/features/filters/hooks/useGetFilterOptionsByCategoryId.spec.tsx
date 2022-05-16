/* eslint-disable max-len */
import React from 'react';
import useGetFilterOptionsByCategoryId from '@features/filters/hooks/useGetFilterOptionsByCategoryId';
import { getFilterOptionsByCategoryId } from '@src/features/filters/filtersSlice';
import groupBy from '@src/common/utils/groupBy';
import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { Wrapper } from '../../../wrapper';
import { mockOptions } from '../../../mocks/data';

const rootState = {
  entities: {
    devices: { 1: { id: 1, images: [1], info: [] } },
    images: { 1: { id: 1, url: 'https://image.jpeg' } },
  },
  filters: {
    options: {
      items: mockOptions,
    },
  },
  devices: {
    items: [1],
  },
};

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

  test('filter action should be called', () => {
    const { result } = renderHook(() => useGetFilterOptionsByCategoryId(1), {
      wrapper: (props) => <Wrapper {...props} state={rootState} />,
    });

    expect(result.current.items).toHaveLength(
      groupBy(mockOptions, 'title').length,
    );
    expect(getFilterOptionsByCategoryId).toBeCalledWith({ categoryId: 1 });
  });

  test('in case category ID was not provided should not call filter action.', () => {
    const { result } = renderHook(
      () => useGetFilterOptionsByCategoryId(undefined),
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.items).toHaveLength(0);
    expect(getFilterOptionsByCategoryId).toBeCalledTimes(0);
  });
});
