import devicesReducer, {
  createDevice,
  deviceActions,
  evaluateDevice,
  getDeviceById,
  getDevices,
  getMoreDevices,
  initialState,
} from '@features/devices/devicesSlice';

describe('DEVICES REDUCER', () => {
  test('should return initial state', () => {
    const action = {
      type: 'TESTS/ANOTHER_ACTION',
    };

    expect(devicesReducer(initialState, action)).toEqual(initialState);
  });

  test('isLoading should be true when client starts to fetch devices', () => {
    const action = {
      type: getDevices.pending.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('isLoading should be false when client received devices', () => {
    const action = {
      type: getDevices.fulfilled.type,
      payload: { result: [1, 2] },
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: [1, 2],
    });
  });

  test('isError should be true when client receives error', () => {
    const action = {
      type: getDevices.rejected.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });
  // eslint-disable-next-line max-len
  test('device.isLoading should be true when client starts to fetch device', () => {
    const action = {
      type: getDeviceById.pending.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      device: {
        ...initialState.device,
        isLoading: true,
      },
    });
  });

  test('device.isLoading should be false when client received device', () => {
    const action = {
      type: getDeviceById.fulfilled.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      device: {
        ...initialState.device,
        isLoading: false,
      },
    });
  });

  test('device.isError should be true when client received error', () => {
    const action = {
      type: getDeviceById.rejected.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      device: {
        ...initialState.device,
        isLoading: false,
        isError: true,
      },
    });
  });
  // eslint-disable-next-line max-len
  test('isLoadingMore should be true when client starts to fetch more devices', () => {
    const action = {
      type: getMoreDevices.pending.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoadingMore: true,
    });
  });
  // eslint-disable-next-line max-len
  test('isLoadingMore should be false when client received more devices', () => {
    const action = {
      type: getMoreDevices.fulfilled.type,
      payload: { result: [3, 4] },
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoadingMore: false,
      items: [3, 4],
    });
  });

  test('isErrorMore should be true when client received error', () => {
    const action = {
      type: getMoreDevices.rejected.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isLoadingMore: false,
      isErrorMore: true,
    });
  });

  test('isCreating should be true', () => {
    const action = {
      type: createDevice.pending.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: true,
      isCreatingError: false,
    });
  });

  test('should add a new device.', () => {
    const action = {
      type: createDevice.fulfilled.type,
      payload: {},
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: false,
      isCreatingError: false,
    });
  });

  test('isCreatingError should be true when API return some error.', () => {
    const action = {
      type: createDevice.rejected.type,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isCreating: false,
      isCreatingError: true,
    });
  });

  test('hasNoDevices should be true when fetched device array is empty.', () => {
    const action = {
      type: getDevices.fulfilled.type,
      payload: { result: [] },
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      hasNoDevices: true,
      hasMore: false,
    });
  });

  test('hasMore should be false', () => {
    const action = {
      type: deviceActions.hasNoMore.type,
      payload: { hasMore: false },
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      hasMore: false,
    });
  });

  test('isEvaluating should be true when evaluateDevice thunk was called.', () => {
    const action = {
      type: evaluateDevice.pending.type,
      payload: undefined,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isEvaluating: true,
      isCreatingError: false,
    });
  });
  // eslint-disable-next-line max-len
  test('isEvaluating should be false when evaluation process fulfilled without errors.', () => {
    const action = {
      type: evaluateDevice.fulfilled.type,
      payload: undefined,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isEvaluating: false,
    });
  });
  // eslint-disable-next-line max-len
  test('isEvaluatingError should be true when during evaluation process something went wrong.', () => {
    const action = {
      type: evaluateDevice.rejected.type,
      payload: undefined,
    };

    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      isEvaluating: false,
      isEvaluatingError: true,
    });
  });
});
