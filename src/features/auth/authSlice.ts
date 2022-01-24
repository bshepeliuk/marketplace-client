import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogin, IRegister } from '@src/common/types/apiTypes';
import * as Api from '@src/api/Api';
import { IUser, IUserData } from '@src/common/types/userTypes';
import { IThunkAPI, Nullable } from '@src/common/types/baseTypes';
import getErrorMessage from '@src/common/utils/getErrorMessage';

const initialState = {
  login: {
    isLoading: false,
    isError: false,
    error: null,
  },
  register: {
    isLoading: false,
    isError: false,
    error: null,
  },
  logout: {
    isLoading: false,
    isError: false,
    error: null,
  },
  isLoggedIn: false,
  user: null as Nullable<IUser>,
};

type State = typeof initialState;

export const login = createAsyncThunk<IUserData, ILogin, IThunkAPI>(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Api.Auth.login({ email, password });

      dispatch(authActions.setLoggedIn({ isLoggedIn: true }));

      return { user: data.user };
    } catch (error) {
      const message = getErrorMessage(error);

      return rejectWithValue({
        message,
      });
    }
  },
);

export const register = createAsyncThunk<IUserData, IRegister, IThunkAPI>(
  'auth/register',
  async ({ email, password, fullName, role }, { rejectWithValue }) => {
    try {
      const { data } = await Api.Auth.register({
        email,
        password,
        fullName,
        role,
      });

      return { user: data.user };
    } catch (error) {
      return rejectWithValue({
        message: 'Something went wrong!',
      });
    }
  },
);

export const logout = createAsyncThunk<undefined, undefined, IThunkAPI>(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await Api.Auth.logout();

      dispatch(authActions.setLoggedIn({ isLoggedIn: false }));
    } catch (error) {
      return rejectWithValue({
        message: 'Something went wrong!',
      });
    }
  },
);

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setLoggedIn(state: State, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setUser(state: State, { payload }: PayloadAction<IUserData>) {
      state.user = payload.user;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state: State) => {
      state.login.isLoading = true;
      state.login.isError = false;
    });
    builder.addCase(
      login.fulfilled,
      (state: State, { payload }: PayloadAction<IUserData>) => {
        state.login.isLoading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
      },
    );
    builder.addCase(login.rejected, (state: State) => {
      state.login.isLoading = false;
      state.login.isError = true;
      state.isLoggedIn = false;
    });
    // register
    builder.addCase(register.pending, (state: State) => {
      state.register.isLoading = true;
      state.register.isError = false;
    });
    builder.addCase(register.fulfilled, (state: State) => {
      state.register.isLoading = false;
    });
    builder.addCase(register.rejected, (state: State) => {
      state.register.isLoading = false;
      state.register.isError = true;
    });
    // logout
    builder.addCase(logout.pending, (state: State) => {
      state.logout.isLoading = true;
      state.logout.isError = false;
    });
    builder.addCase(logout.fulfilled, (state: State) => {
      state.logout.isLoading = false;
    });
    builder.addCase(logout.rejected, (state: State) => {
      state.logout.isLoading = false;
      state.logout.isError = true;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
