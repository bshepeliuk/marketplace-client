import { normalize } from 'normalizr';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import { DeviceSchema, DevicesSchema } from '@common/normalizeSchemas';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IDeviceData, IDevicesData } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  device: {
    isLoading: false,
    isError: false,
    error: null,
  },
  items: [] as number[], // device ids
};

type State = typeof initialState;

export const getDevices = createAsyncThunk<IDevicesData, undefined, IThunkAPI>(
  'devices/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Devices.get();

      const { result, entities } = normalize(data.devices, DevicesSchema);

      return {
        entities,
        result,
        devices: data.devices,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const getDeviceById = createAsyncThunk<
  IDeviceData,
  { deviceId: number },
  IThunkAPI
>('devices/get-one-by-id', async ({ deviceId }, { rejectWithValue }) => {
  try {
    const { data } = await Api.Devices.getOneById(deviceId);

    const { entities } = normalize(data.device, DeviceSchema);

    return {
      entities,
      device: data.device,
    };
  } catch (error) {
    const message = getErrorMessage(error);

    return rejectWithValue({
      message,
    });
  }
});

const devicesSlice = createSlice({
  initialState,
  name: 'devices',
  reducers: {},
  extraReducers: (builder) => {
    // get all devices
    builder.addCase(getDevices.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getDevices.fulfilled,
      (state: State, { payload }: PayloadAction<{ result: number[] }>) => {
        state.isLoading = false;
        state.items = payload.result;
      },
    );
    builder.addCase(getDevices.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
    // get one by id
    builder.addCase(getDeviceById.pending, (state: State) => {
      state.device.isLoading = true;
      state.device.isError = false;
    });
    builder.addCase(getDeviceById.fulfilled, (state: State) => {
      state.device.isLoading = false;
    });
    builder.addCase(getDeviceById.rejected, (state: State) => {
      state.device.isLoading = false;
      state.device.isError = true;
    });
  },
});

export const deviceActions = devicesSlice.actions;
export default devicesSlice.reducer;
