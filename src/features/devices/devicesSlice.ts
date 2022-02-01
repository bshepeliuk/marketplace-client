import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Api from '@src/common/api/Api';
import { IThunkAPI } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';
import { IDevice, IDevicesData } from './types';

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  items: [] as IDevice[],
};

type State = typeof initialState;

export const getDevices = createAsyncThunk<IDevicesData, undefined, IThunkAPI>(
  'devices/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Api.Devices.get();

      return { devices: data.devices };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

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
      (state: State, { payload }: PayloadAction<IDevicesData>) => {
        state.isLoading = false;
        state.items = payload.devices;
      },
    );
    builder.addCase(getDevices.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const deviceActions = devicesSlice.actions;
export default devicesSlice.reducer;
