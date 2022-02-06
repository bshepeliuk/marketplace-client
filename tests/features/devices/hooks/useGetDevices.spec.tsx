import * as ReactRedux from 'react-redux';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetDevices from '@src/features/devices/hooks/useGetDevices';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDevices: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

const mockStore = configureMockStore();
// TODO: create setup function
const store = mockStore({
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
});
// TODO: create setup function
const wrapper = ({ children }: { children: HTMLElement }) => (
  <ReactRedux.Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </ReactRedux.Provider>
);

describe('useGetDevices hook', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('should return devices from state', () => {
    const { result } = renderHook(() => useGetDevices(), {
      wrapper,
    });

    expect(result.current.items).toHaveLength(1);
    expect(dispatch).toBeCalledTimes(0);
    expect(getDevices).toBeCalledTimes(0);
  });

  test('should fetch devices when state is empty', () => {
    // TODO: create setup function
    const newStore = mockStore({
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
    });

    const newWrapper = ({ children }: { children: HTMLElement }) => (
      <ReactRedux.Provider store={newStore}>
        <MemoryRouter>{children}</MemoryRouter>
      </ReactRedux.Provider>
    );

    const { result } = renderHook(() => useGetDevices(), {
      wrapper: newWrapper,
    });

    expect(result.current.items).toHaveLength(0);
    expect(dispatch).toBeCalledTimes(1);
    expect(getDevices).toBeCalledTimes(1);
  });
});
