import * as ReactRedux from 'react-redux';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { getDevices } from '@src/features/devices/devicesSlice';
import useGetDevices from '@src/features/devices/hooks/useGetDevices';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  getDevices: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('[HOOK]: useGetDevices', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  test('should fetch devices', () => {
    const { result } = renderHook(() => useGetDevices(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(result.current.items).toHaveLength(1);
    expect(getDevices).toBeCalledTimes(1);
  });

  test('should fetch devices when state is empty', () => {
    const newState = {
      ...rootStateMock,
      entities: {
        ...rootStateMock.entities,
        devices: {},
      },
      devices: {
        ...rootStateMock.devices,
        items: [],
      },
    };

    const { result } = renderHook(() => useGetDevices(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={newState} />,
    });

    expect(result.current.items).toHaveLength(0);
    expect(dispatch).toBeCalledTimes(1);
    expect(getDevices).toBeCalledTimes(1);
  });
});
