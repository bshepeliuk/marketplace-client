import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

type State = typeof initialState;

export const initialization = createAsyncThunk(
  'app/init',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: await Api.User.get();
    } catch (error) {
      return rejectWithValue({
        message: 'Something went wrong!!!',
      });
    }
  },
);

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initialization.pending, (state: State) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(initialization.fulfilled, (state: State) => {
      state.isLoading = false;
    });
    builder.addCase(initialization.rejected, (state: State) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
