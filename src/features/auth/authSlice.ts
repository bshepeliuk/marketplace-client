import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  fullName: string;
  email: string;
}

interface IUserData {
  user: IUser;
}

const initialState = {
  isLoggedIn: false,
  user: null as IUser | null,
};

type State = typeof initialState;

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
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
