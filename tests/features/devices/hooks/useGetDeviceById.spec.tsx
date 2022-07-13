import * as ReactRedux from 'react-redux';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useGetDeviceById from '@src/features/devices/hooks/useGetDeviceById';
import { getDeviceById } from '@src/features/devices/devicesSlice';
import { Wrapper } from '../../../wrapper';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDeviceById: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const rootState = {
  entities: {
    devices: { 1: { id: 1, images: [1], info: [], ratings: [] } },
    images: { 1: { id: 1, url: 'https://image.jpeg' } },
    ratings: {},
  },
  devices: {
    device: {
      isLoading: false,
    },
    items: [1],
  },
};

describe('useGetDeviceById hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('should return device by id from state', async () => {
    const deviceId = 1;

    const { result } = renderHook(() => useGetDeviceById(deviceId), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={rootState} />
      ),
    });

    expect(result.current.device).toEqual({
      id: 1,
      info: [],
      images: [{ id: 1, url: 'https://image.jpeg' }],
      ratings: [],
    });

    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(result.current.hasNoFound).toBeFalsy();
    expect(result.current.hasNoDevice).toBeFalsy();
  });

  test('should fetch device by id', async () => {
    const deviceId = 2;

    const { result } = renderHook(() => useGetDeviceById(deviceId), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={rootState} />
      ),
    });

    expect(result.current.device).toBeUndefined();
    expect(result.current.hasNoDevice).toBeTruthy();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(getDeviceById).toBeCalledWith({ deviceId: 2 });
  });
});
