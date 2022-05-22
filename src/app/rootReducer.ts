import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '@features/app/appSlice';
import authReducer, { logout } from '@features/auth/authSlice';
import devicesReducer from '@src/features/devices/devicesSlice';
import entitiesReducer from '@src/features/entities/entitiesReducer';
import filtersReducer from '@src/features/filters/filtersSlice';
import categoriesReducer from '@src/features/categories/categoriesSlice';
import brandsReducer from '@src/features/brands/brandsSlice';
import cartReducer from '@src/features/cart/cartSlice';

const authPersistConfig = {
  storage,
  key: 'auth',
  blacklist: ['login', 'logout', 'register'],
};

const baseReducer = combineReducers({
  app: appReducer,
  devices: devicesReducer,
  entities: entitiesReducer,
  filters: filtersReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  cart: cartReducer,
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
