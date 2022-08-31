import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDevice } from '../devices/types';
import addTypesForHeaderAndBodyCells from './helpers/addTypesForHeaderAndBodyCells';
import fillOptionsListByDevices from './helpers/fillOptionsListByDevices';
import getPossibleOptionsListFromDevices from './helpers/getPossibleOptionsListFromDevices';
import { BodyCellType, HeaderCellType } from './types';

export const initialState = {
  items: [] as IDevice[],
  table: {
    header: [] as HeaderCellType[],
    body: [] as Array<BodyCellType[]>,
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
    setComparisonTable(state: State, { payload }: PayloadAction<any>) {
      state.table.header = payload.header;
      state.table.body = payload.body;
    },
    getComparisonTable(state: State) {
      const emptyOptionsList = getPossibleOptionsListFromDevices(state.items);
      const filledInOptionsList = fillOptionsListByDevices({
        list: emptyOptionsList,
        devices: state.items,
      });
      const { header, body } = addTypesForHeaderAndBodyCells({ header: state.items, body: filledInOptionsList });

      state.table.header = header;
      state.table.body = body;
    },
  },
});

export const comparisonActions = comparisonSlice.actions;
export default comparisonSlice.reducer;
