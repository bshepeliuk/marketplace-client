import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  isLoading: false,
};

const filtersSlice = createSlice({
  initialState,
  name: 'filters',
  reducers: {},
});

export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;
