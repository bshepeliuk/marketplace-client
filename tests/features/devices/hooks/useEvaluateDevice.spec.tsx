import React from 'react';
import * as ReactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useEvaluateDevice from '@features/devices/hooks/useEvaluateDevice';
import { evaluateDevice } from '@features/devices/devicesSlice';
import { Wrapper } from '../../../wrapper';

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  evaluateDevice: jest.fn(),
}));

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('[HOOK]: useEvaluateDevice', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return state flags and method for evaluating devices.', () => {
    const { result } = renderHook(useEvaluateDevice, {
      wrapper: Wrapper,
    });

    expect(result.current.isEvaluating).toBeFalsy();
    expect(result.current.isEvaluatingError).toBeFalsy();
    expect(typeof result.current.evaluate).toBe('function');
  });

  test('evaluateDevice should be called with passed params.', async () => {
    const { result } = renderHook(useEvaluateDevice, {
      wrapper: Wrapper,
    });

    const params = { rating: 5, deviceId: 1 };

    act(() => {
      result.current.evaluate(params);
    });

    expect(evaluateDevice).toBeCalledWith(params);
    expect(dispatch).toBeCalledTimes(1);
  });

  test('isEvaluating flag should be equal to evaluating state.', async () => {
    const { result } = renderHook(useEvaluateDevice, {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper {...props} state={{ devices: { isEvaluating: true } }} />
      ),
    });

    expect(result.current.isEvaluating).toBeTruthy();
  });

  test('isEvaluatingError flag should be equal to evaluating state.', async () => {
    const { result } = renderHook(useEvaluateDevice, {
      wrapper: (props: { children: React.ReactNode }) => (
        <Wrapper
          {...props}
          state={{ devices: { isEvaluating: false, isEvaluatingError: true } }}
        />
      ),
    });

    expect(result.current.isEvaluatingError).toBeTruthy();
  });
});
