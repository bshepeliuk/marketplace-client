import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevice } from '../devices/types';

export const initialState = {
  items: [] as IDevice[],
  table: {
    header: [],
    body: [],
  },
};

type State = typeof initialState;

const comparisonSlice = createSlice({
  initialState,
  name: 'comparison',
  reducers: {
    add(state: State, { payload }: PayloadAction<{ device: IDevice }>) {
      state.items.push(payload.device);
    },
    deleteById(state: State, { payload }: PayloadAction<{ deviceId: number }>) {
      state.items = state.items.filter((item) => item.id !== payload.deviceId);
    },
    populate(state: State, { payload }: PayloadAction<{ items: IDevice[] }>) {
      state.items = payload.items;
    },
    setTable(state: State, { payload }: PayloadAction<any>) {
      state.table.header = payload.header;
      state.table.body = payload.body;
    },
  },
});

export const comparisonActions = comparisonSlice.actions;
export default comparisonSlice.reducer;
