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
import commentsReducer from '@src/features/comments/commentsSlice';
import comparisonReducer from '@src/features/comparison/comparisonSlice';
import purchasesReducer from '@src/features/purchases/purchasesSlice';
import ordersReducer from '@src/features/orders/ordersSlice';

const authPersistConfig = {
  storage,
  key: 'auth',
  blacklist: ['login', 'logout', 'register'],
};

const cartPersistConfig = {
  storage,
  key: 'cart',
  blacklist: ['isLoading', 'isError', 'register'],
};

const baseReducer = combineReducers({
  app: appReducer,
  devices: devicesReducer,
  entities: entitiesReducer,
  filters: filtersReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  comments: commentsReducer,
  comparison: comparisonReducer,
  purchases: purchasesReducer,
  orders: ordersReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

type AppState = ReturnType<typeof baseReducer>;

export function rootReducer(state: AppState | undefined, action: AnyAction): AppState {
  if (logout.fulfilled?.match(action)) return baseReducer(undefined, action);
  return baseReducer(state, action);
}
