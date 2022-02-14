import devicesReducer, {
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
});
