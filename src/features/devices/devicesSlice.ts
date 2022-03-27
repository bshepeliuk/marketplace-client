import { normalize } from 'normalizr';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import { DeviceSchema, DevicesSchema } from '@common/normalizeSchemas';
import { IGetDevicesParams } from '@src/common/types/apiTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import {
  DeviceEntities,
  IDevice,
  IDeviceData,
  IDevicesData,
  IGetMoreDevicesParams,
} from './types';
import { DEVICES_OFFSET } from './constants';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isLoadingMore: false,
  isErrorMore: false,
  hasMore: true,
  device: {
    isLoading: false,
    isError: false,
    error: null,
  },
  items: [] as number[], // device ids
};

type State = typeof initialState;

export const getDevices = createAsyncThunk<
  IDevicesData,
  IGetDevicesParams,
  IThunkAPI
>(
  'devices/get-all',
  async (
    { offset = 0, limit = 20, categoryId },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data } = await Api.Devices.get({ offset, limit, categoryId });

      const { result, entities } = normalize<IDevice, DeviceEntities, number[]>(
        data.devices,
        DevicesSchema,
      );

      if (data.devices.length < DEVICES_OFFSET) {
        dispatch(deviceActions.hasNoMore({ hasMore: false }));
      }

      return {
        entities,
        result,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const getMoreDevices = createAsyncThunk<
  IDevicesData,
  IGetMoreDevicesParams,
  IThunkAPI
>(
  'devices/get-more-devices',
  async ({ categoryId }, { rejectWithValue, dispatch, getState }) => {
    const { items } = getState().devices;

    try {
      const { data } = await Api.Devices.get({
        categoryId,
        offset: items.length,
        limit: 20,
      });

      const { result, entities } = normalize<IDevice, DeviceEntities, number[]>(
        data.devices,
        DevicesSchema,
      );

      if (data.devices.length < DEVICES_OFFSET) {
        dispatch(deviceActions.hasNoMore({ hasMore: false }));
      }

      return {
        entities,
        result,
      };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
  {
    condition: (_, { getState }) => {
      const { hasMore, isLoadingMore, isLoading } = getState().devices;

      if (!hasMore || isLoadingMore || isLoading) return false;
    },
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
  reducers: {
    hasNoMore(state: State, { payload }: PayloadAction<{ hasMore: boolean }>) {
      state.hasMore = payload.hasMore;
    },
  },
  extraReducers: (builder) => {
    // get all devices
    builder.addCase(getDevices.pending, (state: State) => {
      state.hasMore = true;
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
    // get more devices
    builder.addCase(getMoreDevices.pending, (state: State) => {
      state.isLoadingMore = true;
      state.isErrorMore = false;
    });
    builder.addCase(
      getMoreDevices.fulfilled,
      (state: State, { payload }: PayloadAction<{ result: number[] }>) => {
        state.isLoadingMore = false;
        state.items.push(...payload.result);
      },
    );
    builder.addCase(getMoreDevices.rejected, (state: State) => {
      state.isLoadingMore = false;
      state.isErrorMore = true;
    });
  },
});

export const deviceActions = devicesSlice.actions;
export default devicesSlice.reducer;
