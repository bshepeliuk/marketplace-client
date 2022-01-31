import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '@features/app/appSlice';
import authReducer, { logout } from '@features/auth/authSlice';

const authPersistConfig = {
  storage,
  key: 'auth',
  blacklist: ['login', 'logout', 'register'],
};

const baseReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

type AppState = ReturnType<typeof baseReducer>;

export function rootReducer(
  state: AppState | undefined,
  action: AnyAction,
): AppState {
  if (logout.fulfilled?.match(action)) return baseReducer(undefined, action);
  return baseReducer(state, action);
}
