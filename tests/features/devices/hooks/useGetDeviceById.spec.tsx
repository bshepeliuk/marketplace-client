import * as ReactRedux from 'react-redux';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import useGetDeviceById from '@src/features/devices/hooks/useGetDeviceById';
import { MemoryRouter } from 'react-router-dom';
import { getDeviceById } from '@src/features/devices/devicesSlice';

const mockStore = configureMockStore();

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDeviceById: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const store = mockStore({
  entities: {
    devices: { 1: { id: 1, images: ['https://image.jpeg'] } },
  },
  devices: {
    device: {
      isLoading: false,
    },
    items: [1],
  },
});

const wrapper = ({ children }: { children: HTMLElement }) => (
  <ReactRedux.Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </ReactRedux.Provider>
);

describe('useGetDeviceById hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('should return device by id from state', async () => {
    const deviceId = 1;

    const { result } = renderHook(() => useGetDeviceById(deviceId), {
      wrapper,
    });

    expect(result.current.device).toEqual({
      id: 1,
      images: ['https://image.jpeg'],
    });
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(result.current.hasNoDeviceFound).toBeFalsy();
    expect(result.current.hasDeviceImages).toBeTruthy();
  });

  test('should fetch device by id', async () => {
    const deviceId = 2;

    const { result } = renderHook(() => useGetDeviceById(deviceId), {
      wrapper,
    });

    expect(result.current.device).toBeUndefined();
    expect(result.current.hasNoDeviceFound).toBeTruthy();
    expect(result.current.hasDeviceImages).toBeFalsy();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(getDeviceById).toBeCalledWith({ deviceId: 2 });
  });
});
