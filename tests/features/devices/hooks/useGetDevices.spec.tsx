import * as ReactRedux from 'react-redux';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetDevices from '@src/features/devices/hooks/useGetDevices';
import { Wrapper } from '../../../wrapper';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDevices: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const rootState = {
  entities: {
    devices: { 1: { id: 1, images: ['https://image.jpeg'] } },
  },
  devices: {
    device: {
      isLoading: false,
    },
    isLoading: false,
    items: [1],
  },
};

describe('useGetDevices hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('should return devices from state', () => {
    const { result } = renderHook(() => useGetDevices(), {
      wrapper: (props) => <Wrapper {...props} state={rootState} />,
    });

    expect(result.current.items).toHaveLength(1);
    expect(dispatch).toBeCalledTimes(0);
    expect(getDevices).toBeCalledTimes(0);
  });

  test('should fetch devices when state is empty', () => {
    const newState = {
      entities: {
        devices: {},
      },
      devices: {
        device: {
          isLoading: false,
        },
        isLoading: false,
        items: [],
      },
    };

    const { result } = renderHook(() => useGetDevices(), {
      wrapper: (props) => <Wrapper {...props} state={newState} />,
    });

    expect(result.current.items).toHaveLength(0);
    expect(dispatch).toBeCalledTimes(1);
    expect(getDevices).toBeCalledTimes(1);
  });
});
