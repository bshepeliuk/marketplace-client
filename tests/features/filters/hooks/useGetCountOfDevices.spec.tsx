/* eslint-disable max-len */
import React from 'react';
import useGetCountOfDevices from '@src/features/filters/hooks/useGetCountOfDevices';
import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FilterProvider } from '@src/features/filters/context/FilterContext';
import store from '@src/app/store';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('useGetCountOfDevices', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initial rendering', () => {
    const { result } = renderHook(() => useGetCountOfDevices(), {
      wrapper: (props: any) => (
        <Provider store={store}>
          <MemoryRouter>
            <FilterProvider>{props.children}</FilterProvider>
          </MemoryRouter>
        </Provider>
      ),
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isLoading).toBeTruthy();
    expect(typeof result.current.getCountByParams).toBe('function');
  });
});
