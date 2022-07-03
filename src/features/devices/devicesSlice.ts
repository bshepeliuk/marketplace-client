import { normalize } from 'normalizr';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import { DeviceSchema, DevicesSchema } from '@common/normalizeSchemas';
import {
  ICreateDeviceParams,
  IGetDevicesProps,
} from '@src/common/types/apiTypes';
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
  hasNoDevices: false,
  isCreating: false,
  isCreatingError: false,
};

type State = typeof initialState;

export const getDevices = createAsyncThunk<
  IDevicesData,
  IGetDevicesProps,
  IThunkAPI
>('devices/get-all', async (props, { rejectWithValue, dispatch }) => {
  const { offset, limit, categoryId, filters } = props;

  try {
    const { data } = await Api.Devices.get({
      offset,
      limit,
      categoryId,
      filters,
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
});

export const getMoreDevices = createAsyncThunk<
  IDevicesData,
  IGetMoreDevicesParams,
  IThunkAPI
>(
  'devices/get-more-devices',
  async ({ filters }, { rejectWithValue, dispatch, getState }) => {
    const { items } = getState().devices;

    try {
      const { data } = await Api.Devices.get({
        filters,
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

export const createDevice = createAsyncThunk<
  any,
  ICreateDeviceParams,
  IThunkAPI
>('device/create', async (params, { rejectWithValue }) => {
  const { images, info, brandId, categoryId, features } = params;

  try {
    const { data } = await Api.Devices.create({
      images,
      info,
      brandId,
      categoryId,
      features,
    });

    const { result, entities } = normalize<IDevice, DeviceEntities, number>(
      data.device,
      DeviceSchema,
    );

    return {
      result,
      entities,
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
      state.hasNoDevices = false;
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      getDevices.fulfilled,
      (state: State, { payload }: PayloadAction<{ result: number[] }>) => {
        if (payload.result.length === 0) {
          state.hasNoDevices = true;
          state.hasMore = false;
        }

        state.isLoading = false;
        state.items = payload.result;
      },
    );
    builder.addCase(getDevices.rejected, (state: State) => {
      state.isLoading = false;
      state.hasNoDevices = false;
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
    // create device
    builder.addCase(createDevice.pending, (state: State) => {
      state.isCreating = true;
      state.isCreatingError = false;
    });
    builder.addCase(createDevice.fulfilled, (state: State) => {
      state.isCreating = false;
    });
    builder.addCase(createDevice.rejected, (state: State) => {
      state.isCreating = false;
      state.isCreatingError = true;
    });
  },
});

export const deviceActions = devicesSlice.actions;
export default devicesSlice.reducer;
